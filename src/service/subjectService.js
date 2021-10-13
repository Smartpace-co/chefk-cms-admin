const Subject = require("../models").subjects;
let utils = require("../helpers/utils");
let modelHelper = require("../helpers/modelHelper");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");

module.exports = {
  createSubject: async (reqBody, reqUser) => {
    try {
      reqBody.createdBy = reqUser.id;
      const savedSubject = await Subject.create(reqBody);
      return utils.responseGenerator(
        StatusCodes.OK,
        "Subject saved successfully",
        savedSubject
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Subject name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllSubjects: async (params) => {
    try {
      let allSubjects = [];
      //pagging
      const { page_size, page_no = 1 } = params;
      const pagging = {};
      parseInt(page_size)
        ? (pagging.offset = parseInt(page_size) * (page_no - 1))
        : null;
      parseInt(page_size) ? (pagging.limit = parseInt(page_size)) : null;
      if (
        Object.keys(params).length !== 0 &&
        (params.filters || params.fields)
      ) {
        const query = await modelHelper.queryBuilder(params);
        allSubjects = await Subject.findAll(query);
      } else {
        allSubjects = await Subject.findAll({
          attributes: [
            "id",
            "subjectTitle",
            "description",
            "uuid",
            "referenceId",
            "systemLanguageId",
            "status",
          ],
          // order: [["id", "DESC"]],
          ...pagging,
        });
      }
      if (allSubjects.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No subject exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "All subjects fetched successfully",
          allSubjects
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getSubject: async (id) => {
    try {
      const subjectDetails = await Subject.findByPk(id);
      if (!subjectDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No subject Exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "subject details fetched Successfully",
          subjectDetails
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateSubject: async (reqBody, reqUser, id) => {
    try {
      const { subjectTitle, description, status } = reqBody;
      let subjectDetails = await Subject.findByPk(id);
      if (!subjectDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No subject found"
        );
      }
      subjectDetails.subjectTitle = subjectTitle;
      subjectDetails.description = description;
      subjectDetails.status = status;
      subjectDetails.updatedBy = reqUser.id;
      await subjectDetails.save();
      return utils.responseGenerator(
        StatusCodes.OK,
        "Subject details updated Successfully",
        subjectDetails
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Subject name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  deleteSubject: async (id) => {
    try {
      const deletedSubject = await Subject.destroy({
        where: {
          id: id,
        },
      });
      return utils.responseGenerator(
        StatusCodes.OK,
        "Subject Details deleted Successfully",
        deletedSubject
      );
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(
          StatusCodes.NO_CONTENT,
          "You cannot delete this subject, it's already being used"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
