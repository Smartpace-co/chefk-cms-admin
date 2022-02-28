"use strict";
const Role = require("../models").roles;
let utils = require("../helpers/utils");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");

module.exports = {
  createRole: async (reqBody, reqUser) => {
    try {
      reqBody.createdBy = reqUser.id;
      const savedRole = await Role.create(reqBody);
      return utils.responseGenerator(
        StatusCodes.OK,
        "Role creted successfully",
        savedRole
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Role name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllRoles: async (params) => {
    try {
      let allRoles = [];
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
        allRoles = await Role.findAll(query);
      } else {
        allRoles = await Role.findAll({
          attributes: ["id", "title", "description", "status"],
          where: { isMaster: false },
          ...pagging,
        });
      }
      if (allRoles.length === 0) {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "No Role Exist", []);
      }
      return utils.responseGenerator(
        StatusCodes.OK,
        "All Role fetched successfully",
        allRoles
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getRole: async (id) => {
    try {
      const roleDetails = await Role.findByPk(id);
      if (!roleDetails) {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "No Role Exist");
      }
      return utils.responseGenerator(
        StatusCodes.OK,
        "Role Details fetched Successfully",
        roleDetails
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateRole: async (reqBody, reqUser, id) => {
    try {
      const { title, description, status } = reqBody;
      const roleDetails = await Role.findByPk(id);
      if (!roleDetails) {
        return utils.responseGenerator(
          StatusCodes.OK,
          "No role Exist",
          roleDetails
        );
      }
      roleDetails.title = title;
      roleDetails.description = description;
      roleDetails.status = status;
      roleDetails.updatedBy = reqUser.id;
      await roleDetails.save();
      return utils.responseGenerator(
        StatusCodes.OK,
        "Role Details updated Successfully",
        roleDetails
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Role name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  deleteRole: async (id) => {
    try {
      const result = await Role.destroy({
        where: {
          id: id,
        },
      });
      return utils.responseGenerator(
        StatusCodes.OK,
        "Role Details deleted Successfully",
        result
      );
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(
          StatusCodes.NO_CONTENT,
          "You cannot delete this role, it's already being used"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
