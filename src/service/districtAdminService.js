const DistrictAdmin = require("../models").district_admins;
const User = require("../models").users;
const SubscriptionPackage = require("../models").subscription_packages;
let utils = require("../helpers/utils");
let axiosHelper = require("../helpers/axiosHelper");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError } = require("sequelize");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const rootPath = config.web_portal_root_path;
const resetPasswordPath = config.web_reset_password_path;
const resetPasswordTemplateId = config.sendgrid.reset_password_template_id;

module.exports = {
  createDistrictAdmin: async (reqBody, reqUser) => {
    try {
      const password = utils.randomString(10);
      reqBody.createdBy = reqUser.id;
      reqBody.password = await utils.bcryptPassword(password);
      const savedUser = await User.create(reqBody);

      reqBody.userId = savedUser.id;
      const savedDistrictAdmin = await DistrictAdmin.create(reqBody);

      let webPortalLoginRes = await axiosHelper.webPortalLogin(reqBody.email, password);
      const accessToken = webPortalLoginRes.token;
      const resetPasswordLink = `${rootPath}${resetPasswordPath}?token=${accessToken}`;

      let templateData = {
        reset_link: resetPasswordLink,
      };

      await utils.sendEmail(
        reqBody.email,
        resetPasswordTemplateId,
        templateData
      );

      return utils.responseGenerator(
        StatusCodes.OK,
        "District saved successfully",
        savedDistrictAdmin
      );
    } catch (err) {
      console.log("Error ==> ", err);
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Email already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllDistrictAdmins: async () => {
    try {
      const allDistricts = await DistrictAdmin.findAll({
        attributes: [
          "id",
          "name",
          "adminAccountName",
          "contactPersonName",
          "contactPersonNo",
          "contactPersonEmail",
        ],
        include: [
          {
            model: User,
            attributes: ["id", "email", "phoneNumber", "roleId"],
          },
          {
            model: SubscriptionPackage,
            attributes: ["id", "packageTitle"],
            as: "package",
          },
        ],
      });
      if (allDistricts.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No district exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "All districts fetched successfully",
          allDistricts
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getDistrictAdmin: async (id) => {
    try {
      const districtDetails = await DistrictAdmin.findOne({
        attributes: [
          "id",
          "name",
          "adminAccountName",
          "contactPersonName",
          "contactPersonNo",
          "contactPersonEmail",
        ],
        where: { id: id },
        include: [
          {
            model: User,
            attributes: ["id", "email", "phoneNumber", "roleId"],
          },
          {
            model: SubscriptionPackage,
            attributes: ["id", "packageTitle"],
            as: "package",
          },
        ],
      });
      if (!districtDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No District Exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "District details fetched Successfully",
          districtDetails
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateDistrictAdmin: async (reqBody, reqUser, id) => {
    try {
      let districtDetails = await DistrictAdmin.count({ where: { id: id } });

      if (!districtDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No district exist"
        );
      }

      reqBody.updatedBy = reqUser.id;
      delete reqBody.password;
      await User.update(reqBody, { where: { id: reqBody.userId } });
      await DistrictAdmin.update(reqBody, { where: { id: id } });

      return utils.responseGenerator(
        StatusCodes.OK,
        "Disctrict details updated Successfully"
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Email already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  deleteDistrictAdmin: async (id) => {
    try {
      const districtDetails = await DistrictAdmin.findOne({
        where: { id: id },
        attributes: ["id", "userId"],
      });

      await DistrictAdmin.destroy({
        where: {
          id: id,
        },
      });

      const deletedDistrict = await User.destroy({
        where: {
          id: districtDetails.userId,
        },
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "District details deleted Successfully",
        deletedDistrict
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
