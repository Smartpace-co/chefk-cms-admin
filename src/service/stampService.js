const Stamp = require("../models").stamps;
let utils = require("../helpers/utils");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError } = require("sequelize");
const Item = require("../models").items;
const Image = require("../models").images;
const moduleKey = "stamp";
const ModuleMaster = require("../models").module_master;
let modelHelper = require("../helpers/modelHelper");
const Country = require("../models").countries;
const LevelType = require("../models").level_types;
const LearningType = require("../models").learning_types;

module.exports = {
  createStamp: async (reqBody, reqUser) => {
    try {
      const moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });
      reqBody.createdBy = reqUser.id;
      const savedStamp = await Stamp.create(reqBody);
      if(reqBody.images && reqBody.images!=null)
      {
       await modelHelper.upsertImageData(
          reqBody.images,
          savedStamp.id,
          moduleDetails,
          reqUser
        );
     }
     
      if (reqBody.stampType == "Level") {
        if (reqBody.relatedItems && reqBody.relatedItems.length) {
          await upsertRelatedItems(
            reqBody.relatedItems,
            savedStamp.id,
            reqUser
          );
        }
      }

      return utils.responseGenerator(
        StatusCodes.OK,
        "Stamp Saved Successfully",savedStamp);

    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Stamp name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getStamps: async () => {
    try {
      let allStamps = await Stamp.findAll({
        attributes: [
          "id",
          "stampTitle",
          "stampType",
          "referenceId",
          "systemLanguageId",
          "status",
        ],
        include: [
          {
            model: Country,
            attributes: ["id", "countryName"],
          },
          {
            model: LevelType,
            attributes: ["id", "level"],
          },
          {
            model: LearningType,
            attributes: ["id", "learning"],
          },
        ],
      });
      return utils.responseGenerator(
        StatusCodes.OK,
        "All Stamps Fetched Successfully",
        allStamps
      );
    } catch (err) {
      console.log("error==>", err);
      throw err;
    }
  },

  getStamp: async (id) => {
    try {
      const moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });
      const stampDetails = await Stamp.findOne({
        where: { id: id },
        include: [
          {
            model: Image,
            attributes: ["id", "image"],
            required:false,
            where: {
              transactionId: id,
              moduleId: moduleDetails.id,
            },
          },
          {
            model: Country,
            attributes: ["id", "countryName"],
          },
          {
            model: LevelType,
            attributes: ["id", "level"],
          },
          {
            model: LearningType,
            attributes: ["id", "learning"],
          },
          {
            model:Item,
            attributes: ["id", "itemTitle","image","status"],
            required:false

          }
        ],
      });

     
        if (!stampDetails) {
          return utils.responseGenerator(
            StatusCodes.NOT_FOUND,
            "No stamp Exist"
          );
        } else {
          return utils.responseGenerator(
            StatusCodes.OK,
            "Stamp Fetched Successfully",
            stampDetails
          );
        }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
  updateStamp: async (reqBody, id, reqUser) => {
    try {
      let stampDetails = await Stamp.findOne({
        attributes: ["id"],
        where: { id: id },
      });
      const moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });
      if (!stampDetails) {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "No stamp Exist");
      }
      // reqBody.updatedBy = reqUser.id;
      await Stamp.update(reqBody, { where: { id: id } });
      // Upsert related items
      if (reqBody.stampType == "Level") {
       await upsertRelatedItems(
          reqBody.relatedItems,
          stampDetails.id,
          reqUser
        );
      }

      // Upsert image data
      await modelHelper.upsertImageData(
        reqBody.images,
        id,
        moduleDetails,
        reqUser
      );

      return utils.responseGenerator(
        StatusCodes.OK,
        "Stamp Updated Successfully"
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Stamp name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },
  deleteStamp: async (id) => {
    try {
      const moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });
      let itemDetails = await Item.findOne({
        attributes: ["id"],
        where: { stampId: id },
      });
      if (itemDetails != null) {
        await Item.destroy({
          where: {
            stampId: id,
          },
        });
      }
      await Image.destroy({
        where: {
          transactionId: id,
          moduleId: moduleDetails.id,
        },
      });

      const deleteStamp = await Stamp.destroy({
        where: {
          id: id,
        },
      });
      return utils.responseGenerator(
        StatusCodes.OK,
        "Stamp Deleted Successfully",
        deleteStamp
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
};

async function upsertRelatedItems(
  relatedItems,
  stampId,
  reqUser
) {
  await Item.destroy({
    where: {
      stampId: stampId,
    },
  });


  let relatedItemDetailsEntity = relatedItems.map((item) => {

    return {
      itemTitle: item.item,
      stampId: stampId,
      image:item.image,
      status: item.itemStatus,
      createdBy: reqUser.id,
      updatedBy: reqUser.id,
    };
    
  });
  let savedItems = await Item.bulkCreate(relatedItemDetailsEntity);
  return savedItems;
}
