const School = require("../models").schools;
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
  createSchool: async (reqBody, reqUser) => {
    try {
      const password = utils.randomString(10);
      reqBody.createdBy = reqUser.id;
      reqBody.password = await utils.bcryptPassword(password);
      const savedUser = await User.create(reqBody);

      reqBody.userId = savedUser.id;
      const savedSchool = await School.create(reqBody);

      let webPortalLoginRes = await axiosHelper.webPortalLogin(
        reqBody.email,
        password
      );
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
        "School saved successfully",
        savedSchool
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

  getAllSchools: async () => {
    try {
      const allSchools = await School.findAll({
        attributes: [
          "id",
          "name",
          "adminAccountName",
          "contactPersonName",
          "contactPersonNumber",
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
          {
            model: DistrictAdmin,
            attributes: ["id", "name"],
            as: "district",
          },
        ],
      });
      if (allSchools.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No school exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "All schools fetched successfully",
          allSchools
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getSchool: async (id) => {
    try {
      const schoolDetails = await School.findOne({
        attributes: [
          "id",
          "name",
          "adminAccountName",
          "contactPersonName",
          "contactPersonNumber",
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
          {
            model: DistrictAdmin,
            attributes: ["id", "name"],
            as: "district",
          },
        ],
      });
      if (!schoolDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No School Exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "School details fetched Successfully",
          schoolDetails
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateSchool: async (reqBody, reqUser, id) => {
    try {
      let schoolCount = await School.count({ where: { id: id } });

      if (!schoolCount) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No school exist"
        );
      }

      reqBody.updatedBy = reqUser.id;
      delete reqBody.password;
      await User.update(reqBody, { where: { id: reqBody.userId } });
      await School.update(reqBody, { where: { id: id } });

      return utils.responseGenerator(
        StatusCodes.OK,
        "School details updated Successfully"
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

  deleteSchool: async (id) => {
    try {
      const schoolDetails = await School.findOne({
        where: { id: id },
        attributes: ["id", "userId"],
      });

      await School.destroy({
        where: {
          id: id,
        },
      });

      const deletedSchool = await User.destroy({
        where: {
          id: schoolDetails.userId,
        },
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "School details deleted Successfully",
        deletedSchool
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
