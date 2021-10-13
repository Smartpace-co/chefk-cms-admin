require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const User = require("../models").users;
const Role = require("../models").roles;
let utils = require("../helpers/utils");
let modelHelper = require("../helpers/modelHelper");
let JWTHelper = require("../helpers/jwtHelper");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");
const resetPasswordPath = config.reset_password_path;
const resetPasswordTemplateId = config.sendgrid.reset_password_template_id;

module.exports = {
  createUser: async (reqBody, reqUser) => {
    try {
      const password = utils.randomString(10);
      reqBody.createdBy = reqUser.id;
      reqBody.isAdmin = true;
      reqBody.password = await utils.bcryptPassword(password);
      const savedUser = await User.create(reqBody);
      delete savedUser.dataValues.password;

      let accessToken = JWTHelper.getAccessTokenForRestPassword(savedUser);
      let resetPasswordLink = `${resetPasswordPath}?token=${accessToken}`;

      let templateData = {
        reset_link: resetPasswordLink,
      };
      await utils.sendEmail(reqBody.email, resetPasswordTemplateId, templateData);

      return utils.responseGenerator(
        StatusCodes.OK,
        "User saved successfully",
        savedUser
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Email already exist"
        );
      } else if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "Role not exist");
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllUsers: async (reqUser) => {
    try {
      let userIds = await modelHelper.getAccessibleIds(reqUser.id);
      const allUsers = await User.findAll({
        attributes: ["id", "name", "email", "phoneNumber", "status"],
        where: { id: userIds },
        include: [
          {
            model: Role,
            attributes: ["id", "title"],
          },
        ],
      });
      if (allUsers.length === 0) {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "No user exist");
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "All users fetched successfully",
          allUsers
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getUser: async (id) => {
    try {
      const userDetails = await User.findOne({
        attributes: ["id", "name", "email", "phoneNumber", "status"],
        where: { id: id },
        include: [
          {
            model: Role,
            attributes: ["id", "title"],
          },
        ],
      });
      if (!userDetails) {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "No user exist");
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "User details fetched Successfully",
          userDetails
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateUser: async (reqBody, reqUser, id) => {
    try {
      const userCount = await User.count({ where: { id: id } });
      if (!userCount) {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "No user exist");
      }
      reqBody.updatedBy = reqUser.id;
      delete reqBody.password;
      await User.update(reqBody, { where: { id: id } });
      return utils.responseGenerator(
        StatusCodes.OK,
        "User details updated Successfully"
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "User title already exist"
        );
      } else if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "Role not exist");
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  deleteUser: async (id) => {
    try {
      const deletedUser = await User.destroy({
        where: {
          id: id,
        },
      });
      return utils.responseGenerator(
        StatusCodes.OK,
        "User details deleted Successfully",
        deletedUser
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
