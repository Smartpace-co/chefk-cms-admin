const User = require("../models").users;
let JWTHelper = require("../helpers/jwtHelper");
let utils = require("../helpers/utils");
let { StatusCodes } = require("http-status-codes");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const resetPasswordPath = config.reset_password_path;
const resetPasswordTemplateId = config.sendgrid.reset_password_template_id;

module.exports = {
  login: async (username, password) => {
    try {
      const user = await User.findOne({
        attributes: [
          "id",
          "roleId",
          "phoneNumber",
          "email",
          "password",
          "status",
          "isAdmin",
        ],
        where: { email: username },
        raw: true,
      });

      if (user) {
        let ispasswordsMatch = await utils.passwordComparison(
          password,
          user.password
        );
        console.log("------", ispasswordsMatch);
        if (!user.status)
          return utils.responseGenerator(
            StatusCodes.FORBIDDEN,
            "User is inactive"
          );
        else if (!user.isAdmin)
          return utils.responseGenerator(
            StatusCodes.UNAUTHORIZED,
            "Unauthorized user"
          );
        else if (!ispasswordsMatch)
          return utils.responseGenerator(
            StatusCodes.UNAUTHORIZED,
            "Username or password incorrect"
          );
        let accessToken = JWTHelper.getAccessToken(user);
        await User.update(
          {
            token: accessToken,
          },
          { where: { email: username } }
        );
        return utils.responseGenerator(StatusCodes.OK, "Login successfull", {
          ...user,
          password: undefined,
          token: accessToken,
        });
      } else {
        return utils.responseGenerator(
          StatusCodes.UNAUTHORIZED,
          "Username or password is incorrect"
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  forgotPasswordValidateEmail: async (email) => {
    try {
      const user = await User.count({
        where: { email: email },
      });
      if (user) {
        let accessToken = JWTHelper.getAccessTokenForRestPassword(user);
        let resetPasswordLink = `${resetPasswordPath}?token=${accessToken}`;

        let templateData = {
          reset_link: resetPasswordLink,
        };
        await utils.sendEmail(email, resetPasswordTemplateId, templateData);
        return utils.responseGenerator(
          StatusCodes.OK,
          "Email verified successfully",
          {
            ...user,
            token: accessToken,
          }
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "Email not registred"
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  resetPassword: async (email, password) => {
    try {
      const user = await User.count({
        where: { email: email },
      });
      if (user) {
        await User.update(
          {
            password: await utils.bcryptPassword(password),
          },
          { where: { email: email } }
        );
        return utils.responseGenerator(
          StatusCodes.OK,
          "Password reset successfully"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "Email is not registred"
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getUserByToken: async (token) => {
    try {
      const user = await User.findOne({
        attributes: ["id", "roleId", "phoneNumber", "email"],
        where: { token: token },
        raw: true,
      });
      if (user) {
        return utils.responseGenerator(
          StatusCodes.OK,
          "User details fetched successfully",
          user
        );
      } else {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "User not found");
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  changesPassword: async (reqBody, reqUser) => {
    try {
      const user = await User.findOne({
        attributes: [
          "id",
          "roleId",
          "phoneNumber",
          "email",
          "password",
          "status",
          "isAdmin",
        ],
        where: { id: reqUser.id, status: true },
        raw: true,
      });
      if (user) {
        let ispasswordsMatch = await utils.passwordComparison(
          reqBody.old_password,
          user.password
        );

        if (!ispasswordsMatch)
          return utils.responseGenerator(
            StatusCodes.FORBIDDEN,
            "Old password doesn't match!"
          );

        let accessToken = JWTHelper.getAccessToken(user);
        await User.update(
          {
            password: await utils.bcryptPassword(reqBody.new_password),
            token: accessToken,
          },
          { where: { id: reqUser.id } }
        );
        return utils.responseGenerator(
          StatusCodes.OK,
          "Change password successfull"
        );
      } else {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "User not found");
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
