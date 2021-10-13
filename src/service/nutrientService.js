const db = require("../models/index");
const Nutrient = require("../models").nutrients;
// const SafetyLevel = require("../models").safety_levels;
const Category = require("../models").categories;
const Type = require("../models").types;
// const Origin = require("../models").origins;
// const Uses = require("../models").uses;
const QuestionType = require("../models").question_types;
const ModuleMaster = require("../models").module_master;
const Question = require("../models").questions;
const Answer = require("../models").answers;
const Image = require("../models").images;
let utils = require("../helpers/utils");
let modelHelper = require("../helpers/modelHelper");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");
const moduleKey = "nutrient";

module.exports = {
  createNutrient: async (reqBody, reqUser) => {
    try {
      const result = await db.sequelize.transaction(async (t) => {
        let promises = [];
        reqBody.createdBy = reqUser.id;
        const [moduleDetails, questionTypes, savedNutrient] = await Promise.all(
          [
            ModuleMaster.findOne({
              where: { moduleKey: moduleKey },
              attributes: ["id"],
            }),
            QuestionType.findAll({
              attributes: ["id", "key"],
            }),
            Nutrient.create(reqBody, {
              transaction: t,
            }),
          ]
        );

        // Upsert related questions
        if (reqBody.relatedQuestions && reqBody.relatedQuestions.length) {
          promises.push(
            modelHelper.upsertRelatedQuestions(
              reqBody.relatedQuestions,
              savedNutrient.id,
              moduleDetails,
              reqUser,
              t
            )
          );
        }

        // Upsert spotlight questions
        if (reqBody.spotlightQuestions && reqBody.spotlightQuestions.length) {
          let spotelightQuestionTypeId = questionTypes.find(
            (f) => f.key === "spotlight"
          ).id;
          promises.push(
            modelHelper.upsertQuestions(
              reqBody.spotlightQuestions,
              spotelightQuestionTypeId,
              moduleDetails,
              reqUser,
              savedNutrient.id,
              t
            )
          );
        }

        // Upsert multi sensory questions
        // if (
        //   reqBody.multiSensoryQuestions &&
        //   reqBody.multiSensoryQuestions.length
        // ) {
        //   let mutiSensoryQuestionTypeId = questionTypes.find(
        //     (f) => f.key === "multiSensory"
        //   ).id;
        //   promises.push(
        //     modelHelper.upsertQuestions(
        //       reqBody.multiSensoryQuestions,
        //       mutiSensoryQuestionTypeId,
        //       moduleDetails,
        //       reqUser,
        //       savedNutrient.id,
        //       t
        //     )
        //   );
        // }

        // Upsert image data
        if (reqBody.images && reqBody.images.length) {
          promises.push(
            modelHelper.upsertImageData(
              reqBody.images,
              savedNutrient.id,
              moduleDetails,
              reqUser,
              t
            )
          );
        }

        await Promise.all(promises);
        return savedNutrient;
      });
      return utils.responseGenerator(
        StatusCodes.OK,
        "Nutrient saved successfully",
        result
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Nutrient name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllNutrients: async (params) => {
    try {
      let allNutrients = [];
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
        allNutrients = await Nutrient.findAll(query);
      } else {
        allNutrients = await Nutrient.findAll({
          attributes: [
            "id",
            "nutrientTitle",
            // "description",
            // "spotlightVideo",
            "referenceId",
            "systemLanguageId",
            "status",
          ],
          include: [
            // {
            //   model: SafetyLevel,
            //   attributes: ["id", "safetyLevelTitle"],
            //   as: "safetyLevel",
            // },
            {
              model: Category,
              attributes: ["id", "categoryTitle"],
            },
            {
              model: Type,
              attributes: ["id", "typeTitle"],
            },
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
            //   required: false,
            // },
            // {
            //   model: Question,
            //   attributes: ["id", "question"],
            //   where: { isDelete: false },
            //   as: "relatedQuestions",
            //   required: false,
            //   include: [
            //     {
            //       model: QuestionType,
            //       attributes: [],
            //       where: { key: "related" },
            //     },
            //   ],
            // },
            // {
            //   model: Question,
            //   attributes: ["id", "question"],
            //   where: { isDelete: false },
            //   as: "spotlightQuestions",
            //   required: false,
            //   include: [
            //     {
            //       model: Answer,
            //       attributes: ["id", "option", "image", "isAnswer"],
            //       where: { isDelete: false },
            //       required: false,
            //     },
            //     {
            //       model: QuestionType,
            //       attributes: [],
            //       where: { key: "spotlight" },
            //     },
            //   ],
            // },
            // {
            //   model: Question,
            //   attributes: ["id", "question"],
            //   where: { isDelete: false },
            //   as: "multiSensoryQuestions",
            //   required: false,
            //   include: [
            //     {
            //       model: Answer,
            //       attributes: ["id", "option", "image", "isAnswer"],
            //       where: { isDelete: false },
            //       required: false,
            //     },
            //     {
            //       model: QuestionType,
            //       attributes: [],
            //       where: { key: "multiSensory" },
            //     },
            //   ],
            // },
          ],
          ...pagging,
        });
      }
      if (allNutrients.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No nutrients exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "All nutrients fetched successfully",
          allNutrients
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getNutrient: async (id) => {
    try {
      let moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });

      const nutrientDetails = await Nutrient.findOne({
        attributes: [
          "id",
          "nutrientTitle",
          "description",
          "spotlightVideo",
          "referenceId",
          "systemLanguageId",
          "status",
        ],
        where: { id: id },
        include: [
          // {
          //   model: SafetyLevel,
          //   attributes: ["id", "safetyLevelTitle"],
          //   as: "safetyLevel",
          // },
          {
            model: Category,
            attributes: ["id", "categoryTitle"],
          },
          {
            model: Type,
            attributes: ["id", "typeTitle"],
          },
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
          {
            model: Question,
            attributes: ["id", "question", "answerTypeId"],
            where: { isDelete: false, moduleId: moduleDetails.id },
            as: "spotlightQuestions",
            required: false,
            include: [
              {
                model: Answer,
                required: false,
                attributes: ["id", "option", "image", "isAnswer"],
                where: { isDelete: false },
                required: false,
              },
              {
                model: QuestionType,
                attributes: [],
                where: { key: "spotlight" },
              },
            ],
          },
          // {
          //   model: Question,
          //   attributes: ["id", "question", "answerTypeId"],
          //   where: { isDelete: false },
          //   as: "multiSensoryQuestions",
          //   required: false,
          //   include: [
          //     {
          //       model: Answer,
          //       attributes: ["id", "option", "image", "isAnswer"],
          //       where: { isDelete: false },
          //       required: false,
          //     },
          //     {
          //       model: QuestionType,
          //       attributes: [],
          //       where: { key: "multiSensory" },
          //     },
          //   ],
          // },
        ],
      });
      if (!nutrientDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No nutrient Exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Nutrient details fetched successfully",
          nutrientDetails
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateNutrient: async (reqBody, reqUser, id) => {
    try {
      await db.sequelize.transaction(async (t) => {
        let promises = [];
        reqBody.createdBy = reqUser.id;
        const [moduleDetails, questionTypes, nutrientDetails] =
          await Promise.all([
            ModuleMaster.findOne({
              where: { moduleKey: moduleKey },
              attributes: ["id"],
            }),
            QuestionType.findAll({
              attributes: ["id", "key"],
            }),
            Nutrient.findOne({
              attributes: ["id"],
              where: { id: id },
            }),
          ]);

        if (!nutrientDetails) {
          return utils.responseGenerator(
            StatusCodes.NOT_FOUND,
            "Nutrient not exist"
          );
        }

        promises.push(
          Nutrient.update(reqBody, { where: { id: id }, transaction: t })
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

        // Upsert spotlight questions
        if (reqBody.spotlightQuestions && reqBody.spotlightQuestions.length) {
          let spotelightQuestionTypeId = questionTypes.find(
            (f) => f.key === "spotlight"
          ).id;
          promises.push(
            modelHelper.upsertQuestions(
              reqBody.spotlightQuestions,
              spotelightQuestionTypeId,
              moduleDetails,
              reqUser,
              id,
              t
            )
          );
        }

        // Upsert multi sensory questions
        // if (
        //   reqBody.multiSensoryQuestions &&
        //   reqBody.multiSensoryQuestions.length
        // ) {
        //   let mutiSensoryQuestionTypeId = questionTypes.find(
        //     (f) => f.key === "multiSensory"
        //   ).id;
        //   promises.push(
        //     modelHelper.upsertQuestions(
        //       reqBody.multiSensoryQuestions,
        //       mutiSensoryQuestionTypeId,
        //       moduleDetails,
        //       reqUser,
        //       id,
        //       t
        //     )
        //   );
        // }

        // Upsert image data
        if (reqBody.images && reqBody.images.length) {
          promises.push(
            modelHelper.upsertImageData(
              reqBody.images,
              id,
              moduleDetails,
              reqUser,
              t
            )
          );
        }

        await Promise.all(promises);
      });
      return utils.responseGenerator(
        StatusCodes.OK,
        "Nutrient details updated Successfully"
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Nutrient name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  deleteNutrient: async (id) => {
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

        await Nutrient.destroy({
          where: {
            id: id,
          },
          transaction: t,
        });
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "Nutrient details deleted Successfully"
      );
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(
          StatusCodes.NO_CONTENT,
          "You cannot delete this nutrient, it's already being used"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
