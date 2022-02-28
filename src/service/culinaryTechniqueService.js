const db = require("../models/index");
const CulinaryTechnique = require("../models").culinary_techniques;
const CulinaryTechniqueTool = require("../models").culinary_technique_tools;
const Tool = require("../models").tools;
// const SafetyLevel = require("../models").safety_levels;
// const Category = require("../models").categories;
// const Type = require("../models").types;
// const Uses = require("../models").uses;
// const Tags = require("../models").tags;
// const Language = require("../models").languages;
const ModuleMaster = require("../models").module_master;
const QuestionType = require("../models").question_types;
// const Question = require("../models").questions;
// const Answer = require("../models").answers;
let utils = require("../helpers/utils");
let modelHelper = require("../helpers/modelHelper");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");
const moduleKey = "culinaryTechniques";

module.exports = {
  createCulinaryTechnique: async (reqBody, reqUser) => {
    try {
      const result = await db.sequelize.transaction(async (t) => {
        let promises = [];
        reqBody.createdBy = reqUser.id;
        const [moduleDetails, questionTypes, savedCulinaryTechnique] =
          await Promise.all([
            ModuleMaster.findOne({
              where: { moduleKey: moduleKey },
              attributes: ["id"],
            }),
            QuestionType.findAll({
              attributes: ["id", "key"],
            }),
            CulinaryTechnique.create(reqBody, {
              transaction: t,
            }),
          ]);

        // Save culinary technique tools
        promises.push(
          upsertCulinaryTechniqueTools(
            reqBody.toolRequirements,
            savedCulinaryTechnique.id,
            reqUser,
            t
          )
        );

        // // Upsert spotlight questions
        // if (reqBody.spotlightQuestions && reqBody.spotlightQuestions.length) {
        //   let spotelightQuestionTypeId = questionTypes.find(
        //     (f) => f.key === "spotlight"
        //   ).id;
        //   promises.push(
        //     modelHelper.upsertQuestions(
        //       reqBody.spotlightQuestions,
        //       spotelightQuestionTypeId,
        //       moduleDetails,
        //       reqUser,
        //       savedCulinaryTechnique.id,
        //       t
        //     )
        //   );
        // }

        // // Upsert multi sensory questions
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
        //       savedCulinaryTechnique.id,
        //       t
        //     )
        //   );
        // }

        await Promise.all(promises);
        return savedCulinaryTechnique;
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "Culinary technique saved successfully",
        result
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Culinary technique name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllCulinaryTechnique: async (params) => {
    try {
      let allCulinaryTechnique = [];
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
        allCulinaryTechnique = await CulinaryTechnique.findAll(query);
      } else {
        allCulinaryTechnique = await CulinaryTechnique.findAll({
          attributes: [
            "id",
            "culinaryTechniqueTitle",
            // "easyOrdering",
            // "kitchenRequirements",
            // "video",
            // "spotlightVideo",
            "referenceId",
            "systemLanguageId",
            "status",
          ],
          // include: [
          //   // {
          //   //   model: SafetyLevel,
          //   //   attributes: ["id", "safetyLevelTitle"],
          //   //   as: "safetyLevel",
          //   // },
          //   // {
          //   //   model: Language,
          //   //   attributes: ["id", "language"],
          //   // },
          //   {
          //     model: Category,
          //     attributes: ["id", "categoryTitle"],
          //   },
          //   {
          //     model: Type,
          //     attributes: ["id", "typeTitle"],
          //   },
          //   {
          //     model: Tags,
          //     attributes: ["id", "tagTitle"],
          //   },
          //   // {
          //   //   model: Uses,
          //   //   attributes: ["id", "usesTitle"],
          //   // },
          //   {
          //     model: CulinaryTechniqueTool,
          //     attributes: ["id"],
          //     as: "toolRequirements",
          //     include: [
          //       {
          //         model: Tool,
          //         attributes: ["id", "toolTitle"],
          //       },
          //     ],
          //   },
          //   {
          //     model: Question,
          //     attributes: ["id", "question"],
          //     where: { isDelete: false },
          //     as: "spotlightQuestions",
          //     required: false,
          //     include: [
          //       {
          //         model: Answer,
          //         attributes: ["id", "option", "image", "isAnswer"],
          //         where: { isDelete: false },
          //         required: false,
          //       },
          //       {
          //         model: QuestionType,
          //         attributes: [],
          //         where: { key: "spotlight" },
          //       },
          //     ],
          //   },
          //   {
          //     model: Question,
          //     attributes: ["id", "question"],
          //     where: { isDelete: false },
          //     as: "multiSensoryQuestions",
          //     required: false,
          //     include: [
          //       {
          //         model: Answer,
          //         attributes: ["id", "option", "image", "isAnswer"],
          //         where: { isDelete: false },
          //         required: false,
          //       },
          //       {
          //         model: QuestionType,
          //         attributes: [],
          //         where: { key: "multiSensory" },
          //       },
          //     ],
          //   },
          // ],
          ...pagging,
        });
      }
      if (allCulinaryTechnique.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No culinary technique exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "All culinary techniques fetched successfully",
          allCulinaryTechnique
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getCulinaryTechnique: async (id) => {
    try {
      let moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });

      const culinaryTechniqueDetails = await CulinaryTechnique.findOne({
        attributes: [
          "id",
          "culinaryTechniqueTitle",
          // "easyOrdering",
          "kitchenRequirements",
          "video",
          "description",
          // "spotlightVideo",
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
          // {
          //   model: Language,
          //   attributes: ["id", "language"],
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
          //   model: Tags,
          //   attributes: ["id", "tagTitle"],
          // },
          // {
          //   model: Uses,
          //   attributes: ["id", "usesTitle"],
          // },
          {
            model: CulinaryTechniqueTool,
            attributes: ["id"],
            as: "toolRequirements",
            include: [
              {
                model: Tool,
                attributes: ["id", "toolTitle"],
              },
            ],
          },
          // {
          //   model: Question,
          //   attributes: ["id", "question", "answerTypeId"],
          //   where: { isDelete: false, moduleId: moduleDetails.id },
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
          //   attributes: ["id", "question", "answerTypeId"],
          //   where: { isDelete: false, moduleId: moduleDetails.id },
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
      if (!culinaryTechniqueDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No culinary technique Exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Culinary technique fetched Successfully",
          culinaryTechniqueDetails
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateCulinaryTechnique: async (reqBody, reqUser, id) => {
    try {
      await db.sequelize.transaction(async (t) => {
        let promises = [];
        const [moduleDetails, questionTypes, culinaryTechniqueDetails] =
          await Promise.all([
            ModuleMaster.findOne({
              where: { moduleKey: moduleKey },
              attributes: ["id"],
            }),
            QuestionType.findAll({
              attributes: ["id", "key"],
            }),
            CulinaryTechnique.findOne({
              attributes: ["id"],
              where: { id: id },
            }),
          ]);

        if (!culinaryTechniqueDetails) {
          return utils.responseGenerator(
            StatusCodes.NOT_FOUND,
            "No culinary technique Exist"
          );
        }

        reqBody.updatedBy = reqUser.id;
        promises.push(
          CulinaryTechnique.update(reqBody, {
            where: { id: id },
            transaction: t,
          })
        );

        // Save culinary technique tools
        promises.push(
          upsertCulinaryTechniqueTools(reqBody.toolRequirements, id, reqUser, t)
        );

        // // Upsert spotlight questions
        // if (reqBody.spotlightQuestions && reqBody.spotlightQuestions.length) {
        //   let spotelightQuestionTypeId = questionTypes.find(
        //     (f) => f.key === "spotlight"
        //   ).id;
        //   promises.push(
        //     modelHelper.upsertQuestions(
        //       reqBody.spotlightQuestions,
        //       spotelightQuestionTypeId,
        //       moduleDetails,
        //       reqUser,
        //       id,
        //       t
        //     )
        //   );
        // }

        // // Upsert multi sensory questions
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

        await Promise.all(promises);
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "Culinary technique details updated Successfully"
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Culinary technique name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  deleteCulinaryTechnique: async (id) => {
    try {
      await db.sequelize.transaction(async (t) => {
        // const moduleDetails = await ModuleMaster.findOne({
        //   where: { moduleKey: moduleKey },
        //   attributes: ["id"],
        // });

        // await Question.update(
        //   { isDelete: true },
        //   {
        //     where: {
        //       transactionId: id,
        //       moduleId: moduleDetails.id,
        //     },
        //     transaction: t,
        //   }
        // );

        await CulinaryTechniqueTool.destroy({
          where: {
            culinaryTechniqueId: id,
          },
          transaction: t,
        });

        await CulinaryTechnique.destroy({
          where: {
            id: id,
          },
          transaction: t,
        });
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "Culinary technique details deleted Successfully"
      );
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(
          StatusCodes.NO_CONTENT,
          "You cannot delete this culinary technique, it's already being used"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },
};

async function upsertCulinaryTechniqueTools(
  toolIds,
  culinaryTechniqueId,
  reqUser,
  t
) {
  try {
    await CulinaryTechniqueTool.destroy({
      where: {
        culinaryTechniqueId: culinaryTechniqueId,
        // id: { [db.Sequelize.Op.notIn]: toolIds },
      },
      transaction: t,
    });
    let culinaryTechniqueToolEntity = toolIds.map((toolId) => {
      return {
        culinaryTechniqueId: culinaryTechniqueId,
        toolId: toolId,
        createdBy: reqUser.id,
        // updatedBy: reqUser.id,
      };
    });
    let savedCulinaryTechniqueTools = await CulinaryTechniqueTool.bulkCreate(
      culinaryTechniqueToolEntity,
      { transaction: t }
      // {
      //   fields: ["id", "culinaryTechniqueId", "toolId", "createdBy", "updatedBy"],
      //   updateOnDuplicate: ["culinaryTechniqueId", "toolId", "updatedBy"],
      // }
    );
    return savedCulinaryTechniqueTools;
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}
