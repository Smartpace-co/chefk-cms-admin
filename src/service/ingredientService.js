const db = require("../models/index");
const Ingredient = require("../models").ingredients;
const Nutrient = require("../models").nutrients;
// const Type = require("../models").types;
const Tag = require("../models").tags;
// const Language = require("../models").languages;
const Allergen = require("../models").allergens;
// const QuestionType = require("../models").question_types;
const ModuleMaster = require("../models").module_master;
// const Question = require("../models").questions;
// const Answer = require("../models").answers;
// const ScienceFact = require("../models").science_facts;
const Substitue = require("../models").substitutes;
const AdditionalNutrient = require("../models").additional_nutrients;
const Image = require("../models").images;
// const QuestionStandard = require("../models").question_standards;
// const Standard = require("../models").standards;
const IngredientAllergen = require("../models").ingredient_allergens;
// const IngredientTag = require("../models").ingredient_tags;
const Season = require("../models").seasons;
let utils = require("../helpers/utils");
let modelHelper = require("../helpers/modelHelper");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");
const moduleKey = "ingredients";

module.exports = {
  createIngredient: async (reqBody, reqUser) => {
    try {
      const result = await db.sequelize.transaction(async (t) => {
        let promises = [];
        reqBody.createdBy = reqUser.id;
        const [moduleDetails, savedIngredient] = await Promise.all([
          ModuleMaster.findOne({
            where: { moduleKey: moduleKey },
            attributes: ["id"],
          }),
          Ingredient.create(reqBody, {
            transaction: t,
          }),
        ]);

        // Upsert science facts
        // if (reqBody.scienceFacts && reqBody.scienceFacts.length) {
        //   promises.push(
        //     upsertScienceFacts(
        //       reqBody.scienceFacts,
        //       savedIngredient.id,
        //       reqUser,
        //       t
        //     )
        //   );
        // }

        // Upsert substitutes
        if (reqBody.substitutes && reqBody.substitutes.length) {
          promises.push(
            upsertSubstitutes(
              reqBody.substitutes,
              savedIngredient.id,
              reqUser,
              t
            )
          );
        }

        // Upsert additional nutrients
        if (reqBody.additionalNutrients && reqBody.additionalNutrients.length) {
          promises.push(
            upsertAdditionalNutrients(
              reqBody.additionalNutrients,
              savedIngredient.id,
              reqUser,
              t
            )
          );
        }

        // Upsert tags
        // if (reqBody.tags && reqBody.tags.length) {
        //   promises.push(
        //     upsertIngredientTags(reqBody.tags, savedIngredient.id, reqUser, t)
        //   );
        // }

        // Upsert allergens
        if (reqBody.allergens && reqBody.allergens.length) {
          promises.push(
            upsertIngredientAllergens(
              reqBody.allergens,
              savedIngredient.id,
              reqUser,
              t
            )
          );
        }

        // Upsert image data
        promises.push(
          modelHelper.upsertImageData(
            reqBody.images,
            savedIngredient.id,
            moduleDetails,
            reqUser,
            t
          )
        );

        // // Upsert spotlight questions
        // if (reqBody.spotlightQuestions && reqBody.spotlightQuestions.length) {
        //   let spotelightQuestionTypeId = questionTypes.find(
        //     (f) => f.key === "spotlight"
        //   ).id;
        //   savedSpotlightQuestions = await modelHelper.upsertQuestions(
        //     reqBody.spotlightQuestions,
        //     spotelightQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     savedIngredient.id
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
        //   savedMultiSensoryQuestions = await modelHelper.upsertQuestions(
        //     reqBody.multiSensoryQuestions,
        //     mutiSensoryQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     savedIngredient.id
        //   );
        // }

        // // Upsert match the pair questions
        // if (
        //   reqBody.matchThePairQuestions &&
        //   reqBody.matchThePairQuestions.length
        // ) {
        //   let matchThePairQuestionTypeId = questionTypes.find(
        //     (f) => f.key === "matchPair"
        //   ).id;
        //   savedMatchThePairQuestions = await modelHelper.upsertQuestions(
        //     reqBody.matchThePairQuestions,
        //     matchThePairQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     savedIngredient.id
        //   );
        // }

        await Promise.all(promises);
        return savedIngredient;
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "Ingredient saved successfully",
        result
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Ingredient name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllIngredients: async (params) => {
    try {
      let allIngredients = [];
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
        allIngredients = await Ingredient.findAll(query);
      } else {
        allIngredients = await Ingredient.findAll({
          attributes: [
            "id",
            "ingredientTitle",
            // "easyOrdering",
            // "size",
            // "scientificName",
            // "commonName",
            // "spotlightVideo",
            "referenceId",
            "systemLanguageId",
            "status",
          ],
          // include: [
          //   {
          //     model: Type,
          //     attributes: ["id", "typeTitle"],
          //   },
          //   // {
          //   //   model: Language,
          //   //   attributes: ["id", "language"],
          //   // },
          //   {
          //     model: ScienceFact,
          //     as: "scienceFacts",
          //     attributes: ["id", "fact"],
          //   },
          //   {
          //     model: Image,
          //     attributes: ["id", "image"],
          //   },
          //   {
          //     model: IngredientTag,
          //     attributes: ["id"],
          //     as: "tags",
          //     include: [
          //       {
          //         model: Tag,
          //         attributes: ["id", "tagTitle"],
          //       },
          //     ],
          //   },
          //   {
          //     model: IngredientAllergen,
          //     attributes: ["id"],
          //     as: "allergens",
          //     include: [
          //       {
          //         model: Allergen,
          //         attributes: ["id", "allergenTitle"],
          //       },
          //     ],
          //   },
          //   {
          //     model: AdditionalNutrient,
          //     attributes: ["id"],
          //     as: "additionalNutrients",
          //     include: [
          //       {
          //         model: Nutrient,
          //         attributes: ["id", "nutrientTitle"],
          //       },
          //     ],
          //   },
          //   {
          //     model: Substitue,
          //     attributes: ["id"],
          //     as: "substitutes",
          //     include: [
          //       {
          //         model: Ingredient,
          //         attributes: ["id", "ingredientTitle"],
          //       },
          //     ],
          //   },
          //   {
          //     model: Question,
          //     attributes: ["id", "question"],
          //     where: { isDelete: false },
          //     required: false,
          //     as: "spotlightQuestions",
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
          //   {
          //     model: Question,
          //     attributes: ["id", "question", "hint", "image"],
          //     where: { isDelete: false },
          //     as: "matchThePairQuestions",
          //     required: false,
          //     include: [
          //       {
          //         model: Answer,
          //         attributes: ["id", "option", "image", "isAnswer"],
          //         where: { isDelete: false },
          //         required: false,
          //       },
          //       {
          //         model: QuestionStandard,
          //         attributes: ["standardId"],
          //         as: "standards",
          //         include: [
          //           {
          //             model: Standard,
          //             attributes: ["id", "standardTitle"],
          //           },
          //         ],
          //       },
          //       {
          //         model: QuestionType,
          //         attributes: [],
          //         where: { key: "matchPair" },
          //       },
          //     ],
          //   },
          // ],
          ...pagging,
        });
      }
      if (allIngredients.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No ingredients exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "All ingredients fetched successfully",
          allIngredients
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getIngredient: async (id) => {
    try {
      const moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });

      const ingredientDetails = await Ingredient.findOne({
        attributes: [
          "id",
          "ingredientTitle",
          "easyOrdering",
          "size",
          "scientificName",
          "commonName",
          "spotlightVideo",
          // "seasonFrom",
          // "seasonTo",
          "referenceId",
          "systemLanguageId",
          "status",
        ],
        where: { id: id },
        include: [
          // {
          //   model: Type,
          //   attributes: ["id", "typeTitle"],
          // },
          // {
          //   model: Language,
          //   attributes: ["id", "language"],
          // },
          // {
          //   model: ScienceFact,
          //   as: "scienceFacts",
          //   attributes: ["id", "fact"],
          // },
          {
            model: Image,
            attributes: ["id", "image"],
            where: { module_id: moduleDetails.id },
            required: false,
          },
          // {
          //   model: IngredientTag,
          //   attributes: ["id"],
          //   as: "tags",
          //   include: [
          //     {
          //       model: Tag,
          //       attributes: ["id", "tagTitle"],
          //     },
          //   ],
          // },
          {
            model: IngredientAllergen,
            attributes: ["id"],
            as: "allergens",
            include: [
              {
                model: Allergen,
                attributes: ["id", "allergenTitle"],
              },
            ],
          },
          {
            model: AdditionalNutrient,
            attributes: ["id"],
            as: "additionalNutrients",
            include: [
              {
                model: Nutrient,
                attributes: ["id", "nutrientTitle"],
              },
            ],
          },
          {
            model: Substitue,
            attributes: ["id"],
            as: "substitutes",
            include: [
              {
                model: Ingredient,
                attributes: ["id", "ingredientTitle"],
              },
            ],
          },
          {
            model: Season,
            attributes: ["id", "title"],
          },
          // {
          //   model: Question,
          //   attributes: ["id", "question"],
          //   where: { isDelete: false },
          //   required: false,
          //   as: "spotlightQuestions",
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
          // {
          //   model: Question,
          //   attributes: ["id", "question", "hint", "image"],
          //   where: { isDelete: false },
          //   as: "matchThePairQuestions",
          //   required: false,
          //   include: [
          //     {
          //       model: Answer,
          //       attributes: ["id", "option", "image", "isAnswer"],
          //       where: { isDelete: false },
          //       required: false,
          //     },
          //     {
          //       model: QuestionStandard,
          //       attributes: ["standardId"],
          //       as: "standards",
          //       include: [
          //         {
          //           model: Standard,
          //           attributes: ["id", "standardTitle"],
          //         },
          //       ],
          //     },
          //     {
          //       model: QuestionType,
          //       attributes: [],
          //       where: { key: "matchPair" },
          //     },
          //   ],
          // },
        ],
      });
      if (!ingredientDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No ingredient Exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Ingredient details fetched successfully",
          ingredientDetails
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateIngredient: async (reqBody, reqUser, id) => {
    try {
      await db.sequelize.transaction(async (t) => {
        let promises = [];
        const [moduleDetails, ingredientDetails] = await Promise.all([
          ModuleMaster.findOne({
            where: { moduleKey: moduleKey },
            attributes: ["id"],
          }),
          Ingredient.findOne({
            attributes: ["id"],
            where: { id: id },
          }),
        ]);

        if (!ingredientDetails) {
          return utils.responseGenerator(
            StatusCodes.NOT_FOUND,
            "No ingredient exist"
          );
        }
        reqBody.updatedBy = reqUser.id;

        promises.push(
          Ingredient.update(reqBody, { where: { id: id }, transaction: t })
        );

        // Upsert science facts
        // if (reqBody.scienceFacts && reqBody.scienceFacts.length) {
        //   promises.push(
        //     upsertScienceFacts(reqBody.scienceFacts, id, reqUser, t)
        //   );
        // }

        // Upsert substitutes
        if (reqBody.substitutes && reqBody.substitutes.length) {
          promises.push(upsertSubstitutes(reqBody.substitutes, id, reqUser, t));
        }

        // Upsert additional nutrients
        if (reqBody.additionalNutrients && reqBody.additionalNutrients.length) {
          promises.push(
            upsertAdditionalNutrients(
              reqBody.additionalNutrients,
              id,
              reqUser,
              t
            )
          );
        }

        // Upsert tags
        // if (reqBody.tags && reqBody.tags.length) {
        //   promises.push(upsertIngredientTags(reqBody.tags, id, reqUser, t));
        // }

        // Upsert allergens
        if (reqBody.allergens && reqBody.allergens.length) {
          promises.push(
            upsertIngredientAllergens(reqBody.allergens, id, reqUser, t)
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

        // // Upsert spotlight questions
        // if (reqBody.spotlightQuestions && reqBody.spotlightQuestions.length) {
        //   let spotelightQuestionTypeId = questionTypes.find(
        //     (f) => f.key === "spotlight"
        //   ).id;
        //   updatedSpotlightQuestions = await modelHelper.upsertQuestions(
        //     reqBody.spotlightQuestions,
        //     spotelightQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     id
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
        //   updatedtMultiSensoryQuestions = await modelHelper.upsertQuestions(
        //     reqBody.multiSensoryQuestions,
        //     mutiSensoryQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     id
        //   );
        // }

        // // Upsert match the pair questions
        // if (
        //   reqBody.matchThePairQuestions &&
        //   reqBody.matchThePairQuestions.length
        // ) {
        //   let matchThePairQuestionTypeId = questionTypes.find(
        //     (f) => f.key === "matchPair"
        //   ).id;
        //   updatedMatchThePairQuestions = await modelHelper.upsertQuestions(
        //     reqBody.matchThePairQuestions,
        //     matchThePairQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     id
        //   );
        // }

        await Promise.all(promises);
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "ingredient details updated Successfully"
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Ingredient name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  deleteIngredient: async (id) => {
    try {
      await db.sequelize.transaction(async (t) => {
        let promises = [];
        const moduleDetails = await ModuleMaster.findOne({
          where: { moduleKey: moduleKey },
          attributes: ["id"],
        });

        promises.push(
          AdditionalNutrient.destroy({
            where: {
              ingredientId: id,
            },
            transaction: t,
          })
        );

        promises.push(
          Substitue.destroy({
            where: {
              ingredientId: id,
            },
            transaction: t,
          })
        );

        // promises.push(
        //   IngredientTag.destroy({
        //     where: {
        //       ingredientId: id,
        //     },
        //     transaction: t,
        //   })
        // );

        promises.push(
          IngredientAllergen.destroy({
            where: {
              ingredientId: id,
            },
            transaction: t,
          })
        );

        // promises.push(
        //   ScienceFact.destroy({
        //     where: {
        //       ingredientId: id,
        //     },
        //     transaction: t,
        //   })
        // );

        promises.push(
          Image.destroy({
            where: {
              transactionId: id,
              moduleId: moduleDetails.id,
            },
            transaction: t,
          })
        );

        // await Question.update(
        //   { isDelete: true },
        //   {
        //     where: {
        //       transactionId: id,
        //       moduleId: moduleDetails.id,
        //     },
        //   }
        // );
        await Promise.all(promises);
        await Ingredient.destroy({
          where: {
            id: id,
          },
          transaction: t,
        });
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "Ingredient details deleted Successfully"
      );
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(
          StatusCodes.NO_CONTENT,
          "You cannot delete this ingredient, it's already being used"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },
};

async function upsertScienceFacts(scienceFacts, ingredientId, reqUser, t) {
  try {
    let scienceFactdIds = scienceFacts
      .filter((fact) => fact.id)
      .map((fact) => fact.id);

    await ScienceFact.destroy({
      where: {
        ingredientId: ingredientId,
        id: { [db.Sequelize.Op.notIn]: scienceFactdIds },
      },
      transaction: t,
    });

    let scienceFactsEntity = scienceFacts.map((e) => {
      return {
        id: e.id,
        ingredientId: ingredientId,
        fact: e.fact || e,
        [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
      };
    });
    let savedScienceFacts = await ScienceFact.bulkCreate(scienceFactsEntity, {
      fields: ["id", "ingredientId", "fact", "createdBy", "updatedBy"],
      updateOnDuplicate: ["fact", "updatedBy"],
      transaction: t,
    });
    return savedScienceFacts;
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertSubstitutes(substitutesIds, ingredientId, reqUser, t) {
  try {
    await Substitue.destroy({
      where: {
        ingredientId: ingredientId,
        // id: { [db.Sequelize.Op.notIn]: substitutesIds },
      },
      transaction: t,
    });

    let substitutesEntity = substitutesIds.map((substitutesId) => {
      return {
        ingredientId: ingredientId,
        substituteId: substitutesId,
        createdBy: reqUser.id,
      };
    });
    let savedSubstitutes = await Substitue.bulkCreate(
      substitutesEntity,
      { transaction: t }
      //   , {
      //   fields: ["id", "ingredientId", "fact", "createdBy", "updatedBy"],
      //   updateOnDuplicate: ["fact", "updatedBy"],
      // }
    );
    return savedSubstitutes;
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertAdditionalNutrients(
  additionalNutrientIds,
  ingredientId,
  reqUser,
  t
) {
  try {
    await AdditionalNutrient.destroy({
      where: {
        ingredientId: ingredientId,
        // id: { [db.Sequelize.Op.notIn]: additionalNutrientIds },
      },
      transaction: t,
    });

    let additionalNutrientsEntity = additionalNutrientIds.map((id) => {
      return {
        ingredientId: ingredientId,
        nutrientId: id,
        createdBy: reqUser.id,
      };
    });
    let savedAdditionalNutrients = await AdditionalNutrient.bulkCreate(
      additionalNutrientsEntity,
      { transaction: t }
      //   , {
      //   fields: ["id", "ingredientId", "fact", "createdBy", "updatedBy"],
      //   updateOnDuplicate: ["fact", "updatedBy"],
      // }
    );
    return savedAdditionalNutrients;
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

// async function upsertIngredientTags(tagIds, ingredientId, reqUser, t) {
//   try {
//     await IngredientTag.destroy({
//       where: {
//         ingredientId: ingredientId,
//       },
//       transaction: t,
//     });

//     let ingredientTagsEntity = tagIds.map((id) => {
//       return {
//         ingredientId: ingredientId,
//         tagId: id,
//         createdBy: reqUser.id,
//       };
//     });
//     let savedIngredientTags = await IngredientTag.bulkCreate(
//       ingredientTagsEntity,
//       { transaction: t }
//     );

//     return savedIngredientTags;
//   } catch (err) {
//     console.log("Error ==> ", err);
//     throw err;
//   }
// }

async function upsertIngredientAllergens(
  allergenIds,
  ingredientId,
  reqUser,
  t
) {
  try {
    await IngredientAllergen.destroy({
      where: {
        ingredientId: ingredientId,
      },
      transaction: t,
    });

    let allergensEntity = allergenIds.map((id) => {
      return {
        ingredientId: ingredientId,
        allergenId: id,
        createdBy: reqUser.id,
      };
    });
    let savedAllergens = await IngredientAllergen.bulkCreate(allergensEntity, {
      transaction: t,
    });

    return savedAllergens;
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}
