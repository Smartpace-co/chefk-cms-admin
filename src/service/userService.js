require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const User = require("../models").users;
const Role = require("../models").roles;
const Student = require("../models").students;
const DistrictAdmin = require("../models").district_admins;
const School = require("../models").schools;
const Teacher = require("../models").teachers;
const SubscriptionPackage = require("../models").subscription_packages;
const SubscribePackage = require("../models").subscribe_packages;
let utils = require("../helpers/utils");
let modelHelper = require("../helpers/modelHelper");
let JWTHelper = require("../helpers/jwtHelper");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");
let { sequelize } = require("../models/index");
const generatePasswordPath = config.generate_password_path;
const generatePasswordTemplateId =
  config.sendgrid.generate_password_template_id;

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
      let generatePasswordLink = `${generatePasswordPath}?token=${accessToken}`;

      let templateData = {
        generate_password_link: generatePasswordLink,
      };
      await utils.sendEmail(
        reqBody.email,
        generatePasswordTemplateId,
        templateData
      );

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
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No user exist",
          []
        );
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

  getWebPortalUsers: async (reqUser) => {
    try {
      let studentRole = await Role.findOne({
        attributes: ["id", "title"],
        where: { title: "Student", isMaster: true },
      });

      let [
        students,
        distrcits,
        schools,
        teachers,
        packages,
        subscribePackages,
        users,
      ] = await Promise.all([
        Student.findAll({
          attributes: [
            "id",
            ["first_name", "name"],
            ["contact_person_email", "email"],
            "status",
            [sequelize.literal(`${studentRole.id}`), "role_id"],
            [sequelize.literal(`'${studentRole.title}'`), "role"],
            "parentId",
          ],
          raw: true,
        }),
        DistrictAdmin.findAll({
          attributes: [
            "id",
            "name",
            "user.email",
            "user.status",
            "user.id",
            // ["`user`.`role_id`", "roleId"],
            "user.role_id",
            "user.role.title",
          ],
          include: [
            {
              model: User,
              attributes: [],
              include: [{ model: Role, attributes: [] }],
            },
          ],
          raw: true,
        }),
        School.findAll({
          attributes: [
            // "id",
            "name",
            "user.email",
            "user.status",
            "user.id",
            "user.role_id",
            "user.role.title",
            "parentId",
          ],
          include: [
            {
              model: User,
              attributes: [],
              include: [{ model: Role, attributes: [] }],
            },
          ],
          raw: true,
        }),
        Teacher.findAll({
          attributes: [
            "id",
            ["first_name", "name"],
            "user.email",
            "user.status",
            "user.id",
            // ["user.role_id", "roleId"],.
            "user.role_id",
            "user.role.title",
            "parentId",
          ],
          include: [
            {
              model: User,
              attributes: [],
              include: [{ model: Role, attributes: [] }],
            },
          ],
          raw: true,
        }),
        SubscriptionPackage.findAll(),
        SubscribePackage.findAll(),
        User.findAll({ attributes: ["id", "role_id"], raw: true }),
      ]);

      students = students.map((student) => {
        let parentUser = { ...student };
        if (student.parentId)
          parentUser = users.find((e) => e.id == student.parentId);
        let subscribePackage = subscribePackages.find(
          (e) =>
            e.entityId == parentUser.id &&
            e.roleId == parentUser.role_id &&
            e.isActive
        );
        if (subscribePackage) {
          let package = packages.find(
            (e) => e.id == subscribePackage.packageId
          );
          return {
            ...student,
            packageId: package.id,
            packageTitle: package.packageTitle,
            isPrivate: package.isPrivate,
            shareableLink: package.shareableLink,
          };
        } else return student;
      });

      distrcits = distrcits.map((user) => {
        let subscribePackage = subscribePackages.find(
          (e) => e.entityId == user.id && e.roleId == user.role_id && e.isActive
        );
        if (subscribePackage) {
          let package = packages.find(
            (e) => e.id == subscribePackage.packageId
          );
          return {
            ...user,
            packageId: package.id,
            packageTitle: package.packageTitle,
            isPrivate: package.isPrivate,
            shareableLink: package.shareableLink,
          };
        } else return user;
      });

      schools = schools.map((user) => {
        let parentUser = { ...user };
        if (user.parentId)
          parentUser = users.find((e) => e.id == user.parentId);
        let subscribePackage = subscribePackages.find(
          (e) =>
            e.entityId == parentUser.id &&
            e.roleId == parentUser.role_id &&
            e.isActive
        );
        if (subscribePackage) {
          let package = packages.find(
            (e) => e.id == subscribePackage.packageId
          );
          return {
            ...user,
            packageId: package.id,
            packageTitle: package.packageTitle,
            isPrivate: package.isPrivate,
            shareableLink: package.shareableLink,
          };
        } else return user;
      });

      teachers = teachers.map((user) => {
        let parentUser = { ...user };
        if (user.parentId)
          parentUser = users.find((e) => e.id == user.parentId);
        let subscribePackage = subscribePackages.find(
          (e) =>
            e.entityId == parentUser.id &&
            e.roleId == parentUser.role_id &&
            e.isActive
        );
        if (subscribePackage) {
          let package = packages.find(
            (e) => e.id == subscribePackage.packageId
          );
          return {
            ...user,
            packageId: package.id,
            packageTitle: package.packageTitle,
            isPrivate: package.isPrivate,
            shareableLink: package.shareableLink,
          };
        } else return user;
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "All users fetched successfully",
        {
          student_count: students.length,
          distrcit_count: distrcits.length,
          teacher_count: teachers.length,
          school_count: schools.length,
          users: students.concat(distrcits, schools, teachers),
        }
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
