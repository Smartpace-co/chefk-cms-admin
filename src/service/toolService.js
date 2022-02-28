const db = require("../models/index");
const Tool = require("../models").tools;
const SafetyLevel = require("../models").safety_levels;
// const DifficultyLevel = require("../models").difficulty_levels;
// const Category = require("../models").categories;
// const Type = require("../models").types;
// const Origin = require("../models").origins;
// const Uses = require("../models").uses;
const ModuleMaster = require("../models").module_master;
const QuestionType = require("../models").question_types;
const Question = require("../models").questions;
const Image = require("../models").images;
let utils = require("../helpers/utils");
let modelHelper = require("../helpers/modelHelper");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");
const moduleKey = "tool";

module.exports = {
  createTool: async (reqBody, reqUser) => {
    try {
      const result = await db.sequelize.transaction(async (t) => {
        let promises = [];
        reqBody.createdBy = reqUser.id;
        reqBody.creatorId = reqUser.id;
        const [moduleDetails, questionTypes, savedTool] = await Promise.all([
          ModuleMaster.findOne({
            where: { moduleKey: moduleKey },
            attributes: ["id"],
          }),
          QuestionType.findAll({
            attributes: ["id", "key"],
          }),
          Tool.create(reqBody, {
            transaction: t,
          }),
        ]);

        // Upsert related questions
        if (reqBody.relatedQuestions && reqBody.relatedQuestions.length) {
          promises.push(
            modelHelper.upsertRelatedQuestions(
              reqBody.relatedQuestions,
              savedTool.id,
              moduleDetails,
              reqUser,
              t
            )
          );
        }

        // Upsert image data
        promises.push(
          modelHelper.upsertImageData(
            reqBody.images,
            savedTool.id,
            moduleDetails,
            reqUser,
            t
          )
        );

        await Promise.all(promises);
        return savedTool;
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "Tool saved successfully",
        result
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Tool name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllTools: async (params) => {
    try {
      let allTools = [];
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
        allTools = await Tool.findAll(query);
      } else {
        allTools = await Tool.findAll({
          attributes: [
            "id",
            "toolTitle",
            "referenceId",
            "systemLanguageId",
            "status",
          ],
          include: [
            {
              model: SafetyLevel,
              attributes: ["id", "safetyLevelTitle"],
              as: "safetyLevel",
            },
            // {
            //   model: DifficultyLevel,
            //   attributes: ["id", "difficultyLevelTitle"],
            //   as: "difficultyLevel",
            // },
            // {
            //   model: Category,
            //   attributes: ["id", "categoryTitle"],
            // },
            // {
            //   model: Type,
            //   attributes: ["id", "typeTitle"],
            // },
            // {
            //   model: Origin,
            //   attributes: ["id", "originTitle"],
            // },
            // {
            //   model: Uses,
            //   attributes: ["id", "usesTitle"],
            // },
            // {
            //   model: Image,
            //   attributes: ["id", "image"],
            // },
            // {
            //   model: Question,
            //   attributes: ["id", "question"],
            //   where: { isDelete: false },
            //   as: "relatedQuestions",
            //   include: [
            //     {
            //       model: QuestionType,
            //       attributes: [],
            //       where: { key: "related" },
            //     },
            //   ],
            // },
          ],
          ...pagging,
        });
      }
      if (allTools.length === 0) {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "No tools exist", []);
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "All tools fetched successfully",
          allTools
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getTool: async (id) => {
    try {
      const moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });

      const toolDetails = await Tool.findOne({
        attributes: [
          "id",
          "toolTitle",
          "description",
          "referenceId",
          "systemLanguageId",
          "status",
        ],
        where: { id: id },
        include: [
          {
            model: SafetyLevel,
            attributes: ["id", "safetyLevelTitle"],
            as: "safetyLevel",
          },
          // {
          //   model: DifficultyLevel,
          //   attributes: ["id", "difficultyLevelTitle"],
          //   as: "difficultyLevel",
          // },
          // {
          //   model: Category,
          //   attributes: ["id", "categoryTitle"],
          // },
          // {
          //   model: Type,
          //   attributes: ["id", "typeTitle"],
          // },
          // {
          //   model: Origin,
          //   attributes: ["id", "originTitle"],
          // },
          // {
          //   model: Uses,
          //   attributes: ["id", "usesTitle"],
          // },
          {
            model: Image,
            required: false,
            attributes: ["id", "image"],
            where: { module_id: moduleDetails.id },
          },
          {
            model: Question,
            attributes: ["id", "question"],
            where: { isDelete: false, moduleId: moduleDetails.id },
            as: "relatedQuestions",
            required: false,
            include: [
              {
                model: QuestionType,
                attributes: [],
                where: { key: "related" },
              },
            ],
          },
        ],
      });
      if (!toolDetails) {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "No tool Exist");
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Tool details fetched Successfully",
          toolDetails
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateTool: async (reqBody, reqUser, id) => {
    try {
      await db.sequelize.transaction(async (t) => {
        let promises = [];
        reqBody.updatedBy = reqUser.id;
        const [moduleDetails, questionTypes, toolDetails] = await Promise.all([
          ModuleMaster.findOne({
            where: { moduleKey: moduleKey },
            attributes: ["id"],
          }),
          QuestionType.findAll({
            attributes: ["id", "key"],
          }),
          Tool.findOne({ where: { id: id } }),
        ]);

        if (!toolDetails) {
          return utils.responseGenerator(
            StatusCodes.NOT_FOUND,
            "No tool exist"
          );
        }

        promises.push(
          Tool.update(reqBody, { where: { id: id }, transaction: t })
        );

        // Upsert related questions
        if (reqBody.relatedQuestions && reqBody.relatedQuestions.length) {
          promises.push(
            modelHelper.upsertRelatedQuestions(
              reqBody.relatedQuestions,
              id,
              moduleDetails,
              reqUser,
              t
            )
          );
        }

        // Upsert image data
        promises.push(
          modelHelper.upsertImageData(
            reqBody.images,
            id,
            moduleDetails,
            reqUser,
            t
          )
        );

        await Promise.all(promises);
      });
      return utils.responseGenerator(
        StatusCodes.OK,
        "Tool details updated Successfully"
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Tool name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  deleteTool: async (id) => {
    try {
      await db.sequelize.transaction(async (t) => {
        const moduleDetails = await ModuleMaster.findOne({
          where: { moduleKey: moduleKey },
          attributes: ["id"],
        });

        await Question.update(
          { isDelete: true },
          {
            where: {
              transactionId: id,
              moduleId: moduleDetails.id,
            },
            transaction: t,
          }
        );

        await Image.destroy({
          where: {
            transactionId: id,
            moduleId: moduleDetails.id,
          },
          transaction: t,
        });

        await Tool.destroy({
          where: {
            id: id,
          },
          transaction: t,
        });
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "Tool details deleted Successfully"
      );
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(
          StatusCodes.NO_CONTENT,
          "You cannot delete this tool, it's already being used"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
