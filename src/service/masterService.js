const db = require("../models/index");
const SafetyLevel = require("../models").safety_levels;
const DifficultyLevel = require("../models").difficulty_levels;
const Category = require("../models").categories;
const Type = require("../models").types;
const Origin = require("../models").origins;
const Uses = require("../models").uses;
const Tag = require("../models").tags;
const AnswerType = require("../models").answer_types;
const Grade = require("../models").grades;
const Language = require("../models").languages;
const Allergen = require("../models").allergens;
const ModuleMaster = require("../models").module_master;
let utils = require("../helpers/utils");
let modelHelper = require("../helpers/modelHelper");
const LevelType = require("../models").level_types;
const LearningType = require("../models").learning_types;
const MealType = require("../models").meal_types;
const DietAndHealth = require("../models").diet_and_health;
const QuestionType = require("../models").question_types;
const Skill = require("../models").skills;
const Season = require("../models").seasons;
let { StatusCodes } = require("http-status-codes");

module.exports = {
  getSafetyLevels: async () => {
    try {
      const safetyLevels = await SafetyLevel.findAll({
        attributes: ["id", "safetyLevelTitle", "status"],
      });
      if (safetyLevels.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No safety level exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Safety levels fetched successfully",
          safetyLevels
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getDifficultyLevels: async () => {
    try {
      const difficultyLevels = await DifficultyLevel.findAll({
        attributes: ["id", "difficultyLevelTitle", "status"],
      });
      if (difficultyLevels.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No difficulty level exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Difficulty levels fetched successfully",
          difficultyLevels
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getCategories: async (moduleKey) => {
    try {
      const categorie = await Category.findAll({
        attributes: ["id", "categoryTitle", "status"],
        include: [
          {
            model: ModuleMaster,
            attributes: [],
            where: { moduleKey: moduleKey },
          },
        ],
      });
      if (categorie.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No category exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Categories fetched successfully",
          categorie
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getTypes: async (moduleKey) => {
    try {
      const types = await Type.findAll({
        attributes: ["id", "typeTitle", "status"],
        include: [
          {
            model: ModuleMaster,
            attributes: [],
            where: { moduleKey: moduleKey },
          },
        ],
      });
      if (types.length === 0) {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "No type exist", []);
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Types fetched successfully",
          types
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getUses: async (moduleKey) => {
    try {
      const uses = await Uses.findAll({
        attributes: ["id", "usesTitle", "status"],
        include: [
          {
            model: ModuleMaster,
            attributes: [],
            where: { moduleKey: moduleKey },
          },
        ],
      });
      if (uses.length === 0) {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "No uses exist", []);
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Uses fetched successfully",
          uses
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getOrigins: async (moduleKey) => {
    try {
      const origins = await Origin.findAll({
        attributes: ["id", "originTitle", "status"],
        include: [
          {
            model: ModuleMaster,
            attributes: [],
            where: { moduleKey: moduleKey },
          },
        ],
      });
      if (origins.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No origin exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Origin fetched successfully",
          origins
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getTags: async (moduleKey) => {
    try {
      const tags = await Tag.findAll({
        attributes: ["id", "tagTitle", "status"],
        include: [
          {
            model: ModuleMaster,
            attributes: [],
            where: { moduleKey: moduleKey },
          },
        ],
      });
      if (tags.length === 0) {
        return utils.responseGenerator(StatusCodes.NOT_FOUND, "No tag exist", []);
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Tag fetched successfully",
          tags
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAnswerTypes: async () => {
    try {
      const answerTypes = await AnswerType.findAll({
        attributes: ["id", "title", "status"],
        where: { key: { [db.Sequelize.Op.not]: "none" } },
      });
      if (answerTypes.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No answer types exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Answer types fetched successfully",
          answerTypes
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getLanguages: async () => {
    try {
      const languages = await Language.findAll({
        attributes: ["id", "language", "status"],
      });
      if (languages.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No languages exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Languages fetched successfully",
          languages
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllergens: async () => {
    try {
      const allergens = await Allergen.findAll({
        attributes: ["id", "allergenTitle", "status"],
      });
      if (allergens.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No allergens exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Allergens fetched successfully",
          allergens
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getGrades: async (moduleKey) => {
    try {
      const grades = await Grade.findAll({
        attributes: ["id", "grade", "status"],
      });
      if (grades.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No grades exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Grades fetched successfully",
          grades
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getLevelTypes: async (moduleKey) => {
    try {
      const levelTypes = await LevelType.findAll({
        attributes: ["id", "level", "status"],
      });
      if (levelTypes.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No level types exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "level types fetched successfully",
          levelTypes
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getLearningTypes: async (moduleKey) => {
    try {
      const learningTypes = await LearningType.findAll({
        attributes: ["id", "learning", "status"],
      });
      if (learningTypes.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No learning types exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "learning types fetched successfully",
          learningTypes
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  createTag: async (reqBody, reqUser, moduleKey) => {
    try {
      const tagCount = await Tag.count({
        where: { tagTitle: reqBody.tagTitle },
        include: [
          {
            model: ModuleMaster,
            attributes: [],
            where: { moduleKey: moduleKey },
          },
        ],
      });
      if (tagCount)
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Tag name already exist"
        );
      const moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });
      reqBody.createdBy = reqUser.id;
      reqBody.moduleId = moduleDetails.id;
      const savedTag = await Tag.create(reqBody);
      return utils.responseGenerator(
        StatusCodes.OK,
        "Tag saved successfully",
        savedTag
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getMealTypes: async () => {
    try {
      const mealTypes = await MealType.findAll({
        attributes: ["id", "title"],
      });
      if (mealTypes.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No meal type exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Meal type fetched successfully",
          mealTypes
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getDietAndHealth: async () => {
    try {
      const dietAndHealth = await DietAndHealth.findAll({
        attributes: ["id", "title"],
      });
      if (dietAndHealth.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No diet and health exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Diet and health fetched successfully",
          dietAndHealth
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  createCategory: async (reqBody, reqUser, moduleKey) => {
    try {
      const categoryCount = await Category.count({
        where: { categoryTitle: reqBody.categoryTitle },
        include: [
          {
            model: ModuleMaster,
            attributes: [],
            where: { moduleKey: moduleKey },
          },
        ],
      });
      if (categoryCount)
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Category already exist"
        );
      const moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });
      reqBody.createdBy = reqUser.id;
      reqBody.moduleId = moduleDetails.id;
      const savedCategory = await Category.create(reqBody);
      return utils.responseGenerator(
        StatusCodes.OK,
        "Category saved successfully",
        savedCategory
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  createAllergen: async (reqBody, reqUser) => {
    try {
      const allergenCount = await Allergen.count({
        where: { allergenTitle: reqBody.allergenTitle },
      });
      if (allergenCount)
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Allergen already exist"
        );
      reqBody.createdBy = reqUser.id;
      const savedAllergen = await Allergen.create(reqBody);
      return utils.responseGenerator(
        StatusCodes.OK,
        "Allergen saved successfully",
        savedAllergen
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getQuestionTypes: async (params) => {
    try {
      let questionTypes = [];
      if (Object.keys(params).length !== 0) {
        const query = await modelHelper.queryBuilder(params);
        questionTypes = await QuestionType.findAll(query);
      } else {
        questionTypes = await QuestionType.findAll({
          attributes: ["id", "title", "status"],
          // where: { key: { [db.Sequelize.Op.not]: "none" } },
        });
      }
      if (questionTypes.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No question types exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Question types fetched successfully",
          questionTypes
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getSkills: async (params) => {
    try {
      let skills = [];
      if (Object.keys(params).length !== 0) {
        const query = await modelHelper.queryBuilder(params);
        skills = await Skill.findAll(query);
      } else {
        skills = await Skill.findAll({
          attributes: ["id", "skillTitle"],
        });
      }
      if (skills.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No skills exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Skills fetched successfully",
          skills
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getSeasons: async (params) => {
    try {
      let seasons = [];
      if (Object.keys(params).length !== 0) {
        const query = await modelHelper.queryBuilder(params);
        seasons = await Season.findAll(query);
      } else {
        seasons = await Season.findAll({
          attributes: ["id", "title"],
        });
      }
      if (seasons.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No season exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Seasons fetched successfully",
          seasons
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
