const Standard = require("../models").standards;
const Subject = require("../models").subjects;
const StandardSkill = require("../models").standard_skills;
const Skill = require("../models").skills;
const Grade = require("../models").grades;
let utils = require("../helpers/utils");
let modelHelper = require("../helpers/modelHelper");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");

module.exports = {
  createStandard: async (reqBody, reqUser) => {
    try {
      reqBody.createdBy = reqUser.id;
      const savedStandard = await Standard.create(reqBody);

      // Upsert additional nutrients
      if (reqBody.skills && reqBody.skills.length) {
        await upsertStandardSkills(reqBody.skills, savedStandard.id, reqUser);
      }

      return utils.responseGenerator(
        StatusCodes.OK,
        "Standard saved successfully",
        savedStandard
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Standard title already exist"
        );
      } else if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "Subject not exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllStandards: async (params) => {
    try {
      let allStandards = [];
      //pagging
      const { page_size, page_no = 1 } = params;
      const pagging = {};
      parseInt(page_size)
        ? (pagging.offset = parseInt(page_size) * (page_no - 1))
        : null;
      parseInt(page_size) ? (pagging.limit = parseInt(page_size)) : null;
      if (
        Object.keys(params).length !== 0 &&
        (params.filters || params.fields || params.sorting)
      ) {
        const query = await modelHelper.queryBuilder(params, pagging);
        allStandards = await Standard.findAll(query);
      } else {
        allStandards = await Standard.findAll({
          attributes: [
            "id",
            "standardTitle",
            "referenceId",
            "systemLanguageId",
            "status",
          ],
          include: [
            {
              model: Subject,
              attributes: ["id", "subjectTitle"],
            },
          ],
          ...pagging,
        });
      }
      if (allStandards.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No standards exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "All standards fetched successfully",
          allStandards
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getStandard: async (id) => {
    try {
      const standardDetails = await Standard.findOne({
        where: { id: id },
        attributes: [
          "id",
          "standardTitle",
          "description",
          "status",
          "image",
          "referenceId",
          "systemLanguageId",
          "image",
        ],
        include: [
          {
            model: Subject,
            attributes: ["id", "subjectTitle", "description"],
          },
          {
            model: Grade,
            attributes: ["id", "grade"],
          },
          {
            model: StandardSkill,
            attributes: ["id"],
            as: "skills",
            include: [
              {
                model: Skill,
                attributes: ["id", "skillTitle"],
              },
            ],
          },
        ],
      });
      if (!standardDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No standard Exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Standard details fetched Successfully",
          standardDetails
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateStandard: async (reqBody, reqUser, id) => {
    try {
      let standardDetails = await Standard.findOne({ where: { id: id } });
      if (!standardDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No subject found"
        );
      }
      reqBody.updatedBy = reqUser.id;
      await Standard.update(reqBody, { where: { id: id } });

      // Upsert additional nutrients
      if (reqBody.skills) {
        await upsertStandardSkills(reqBody.skills, id, reqUser);
      }

      return utils.responseGenerator(
        StatusCodes.OK,
        "Standard details updated Successfully"
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Standard title already exist"
        );
      } else if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "Subject not exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  deleteStandard: async (id) => {
    try {
      await StandardSkill.destroy({
        where: {
          standardId: id,
        },
      });
      const deletedStandard = await Standard.destroy({
        where: {
          id: id,
        },
      });
      return utils.responseGenerator(
        StatusCodes.OK,
        "Standard details deleted Successfully",
        deletedStandard
      );
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(
          StatusCodes.NO_CONTENT,
          "You cannot delete this standard, it's already being used"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },
};

async function upsertStandardSkills(standardSkillIds, standardId, reqUser) {
  try {
    await StandardSkill.destroy({
      where: {
        standardId: standardId,
      },
    });

    let standardSkillsEntity = standardSkillIds.map((id) => {
      return {
        standardId: standardId,
        skillId: id,
        createdBy: reqUser.id,
      };
    });
    let savedStandardSkills = await StandardSkill.bulkCreate(
      standardSkillsEntity
    );
    return savedStandardSkills;
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}
