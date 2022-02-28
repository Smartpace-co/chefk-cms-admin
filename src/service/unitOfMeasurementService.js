const db = require("../models/index");
const UnitOfMeasurement = require("../models").unit_of_measurements;
let utils = require("../helpers/utils");
let modelHelper = require("../helpers/modelHelper");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");

module.exports = {
  createUnitOfMeasurement: async (reqBody, reqUser) => {
    try {
      reqBody.createdBy = reqUser.id;
      const savedUnitOfMeasurement = await UnitOfMeasurement.create(reqBody);
      return utils.responseGenerator(
        StatusCodes.OK,
        "Unit of measurement saved successfully",
        savedUnitOfMeasurement
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Unit of measurement already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllUnitOfMeasurements: async (params) => {
    try {
      let allUnitOfMeasurements = [];
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
        allUnitOfMeasurements = await UnitOfMeasurement.findAll(query);
      } else {
        allUnitOfMeasurements = await UnitOfMeasurement.findAll({
          attributes: [
            "id",
            "unitOfMeasure",
            "description",
            "referenceId",
            "systemLanguageId",
            "status",
          ],
          ...pagging,
        });
      }
      if (allUnitOfMeasurements.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No Unit of measurement exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "All Unit of measurements fetched successfully",
          allUnitOfMeasurements
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getUnitOfMeasurement: async (id) => {
    try {
      const unitOfMeasurementDetails = await UnitOfMeasurement.findByPk(id);
      if (!unitOfMeasurementDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No Unit of measurement exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Unit of measurement details fetched Successfully",
          unitOfMeasurementDetails
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateUnitOfMeasurement: async (reqBody, reqUser, id) => {
    try {
      const unitOfMeasurementCount = await UnitOfMeasurement.count({
        where: { id: id },
      });
      if (!unitOfMeasurementCount) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No unit of measurement found"
        );
      }
      reqBody.updatedBy = reqUser.id;
      await UnitOfMeasurement.update(reqBody, { where: { id: id } });
      return utils.responseGenerator(
        StatusCodes.OK,
        "Unit of measurement details updated Successfully"
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Unit of measurement name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  deleteUnitOfMeasurement: async (id) => {
    try {
      const deletedUnitOfMeasurement = await UnitOfMeasurement.destroy({
        where: {
          id: id,
        },
      });
      return utils.responseGenerator(
        StatusCodes.OK,
        "Unit of measurement Details deleted Successfully",
        deletedUnitOfMeasurement
      );
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(
          StatusCodes.NO_CONTENT,
          "You cannot delete this unit of measurement, it's already being used"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
