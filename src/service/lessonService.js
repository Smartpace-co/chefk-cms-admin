const db = require("../models/index");
// const Type = require("../models").types;
const QuestionType = require("../models").question_types;
const ModuleMaster = require("../models").module_master;
const Question = require("../models").questions;
const Answer = require("../models").answers;
// const SafetyLevel = require("../models").safety_levels;
const Grade = require("../models").grades;
const Subject = require("../models").subjects;
const Country = require("../models").countries;
const QuestionStandard = require("../models").question_standards;
const Standard = require("../models").standards;
const Lesson = require("../models").lessons;
const SafetyStep = require("../models").safety_steps;
const ChefIntroduction = require("../models").chef_introductions;
const Recipe = require("../models").recipes;
const BigChefTool = require("../models").big_chef_tools;
const LittleChefTool = require("../models").little_chef_tools;
const RecipeIngredient = require("../models").recipe_ingredients;
const RecipeTechnique = require("../models").recipe_techniques;
const PreparationStep = require("../models").preparation_steps;
const CookingStep = require("../models").cooking_steps;
const ServingStep = require("../models").serving_steps;
const Experiment = require("../models").experiments;
const ExperimentIngredient = require("../models").experiment_ingredients;
const ExperimentTool = require("../models").experiment_tools;
// const ExperimentTechnique = require("../models").experiment_techniques;
const ExperimentStep = require("../models").experiment_steps;
const Activity = require("../models").activities;
const User = require("../models").users;
const LessonLink = require("../models").lesson_links;
const Ingredient = require("../models").ingredients;
const UnitOfMeasurement = require("../models").unit_of_measurements;
const CulinaryTechnique = require("../models").culinary_techniques;
// const MealType = require("../models").meal_types;
// const DietAndHealth = require("../models").diet_and_health;
const Language = require("../models").languages;
const Tool = require("../models").tools;
const CleanupStep = require("../models").cleanup_steps;
const TeacherInstruction = require("../models").teacher_instructions;
const AnswerType = require("../models").answer_types;
const SpotlightFact = require("../models").spotlight_facts;
let utils = require("../helpers/utils");
let modelHelper = require("../helpers/modelHelper");
let fileParser = require("../helpers/fileParser");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");
const moduleKey = "lesson";
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const excelUploadLocation = config.excel_upload_location;
const fs = require("fs");
const School = require("../models").schools;
const Role = require("../models/").roles;
let notificationService = require("../service/notificationService");
const DistrictAdmin = require("../models").district_admins;
let generalTemplateId = config.sendgrid.general_template_id;

module.exports = {
  createLesson: async (reqBody, reqUser) => {
    try {
      const result = await db.sequelize.transaction(async (t) => {
        let promises = [];
        const lessonTime = calculateLessonTime(reqBody);
        reqBody.createdBy = reqUser.id;
        reqBody.creatorId = reqUser.id;
        reqBody.lessonTime = lessonTime;
        const [moduleDetails, questionTypes, savedLesson] = await Promise.all([
          ModuleMaster.findOne({
            where: { moduleKey: moduleKey },
            attributes: ["id"],
          }),
          QuestionType.findAll({
            attributes: ["id", "key"],
          }),
          Lesson.create(reqBody, {
            transaction: t,
          }),
        ]);

        // Upsert lesson links
        if (reqBody.links) {
          promises.push(
            upsertLessonLinks(reqBody.links, savedLesson.id, reqUser, t)
          );
        }

        // Upsert cleanup steps
        if (reqBody.cleanupSteps && reqBody.cleanupSteps.length) {
          promises.push(
            upsertCleanupSteps(reqBody.cleanupSteps, savedLesson.id, reqUser, t)
          );
        }

        // Upsert teacher instructions
        if (reqBody.teacherInstructions && reqBody.teacherInstructions.length) {
          promises.push(
            upsertTeacherInstrcutions(
              reqBody.teacherInstructions,
              savedLesson.id,
              reqUser,
              t
            )
          );
        }

        // Upsert chef introductions
        if (reqBody.chefIntroductions && reqBody.chefIntroductions.length) {
          promises.push(
            upsertChefIntrocutions(
              reqBody.chefIntroductions,
              savedLesson.id,
              reqUser,
              t
            )
          );
        }

        // Upsert safety steps
        if (reqBody.safetySteps && reqBody.safetySteps.length) {
          promises.push(
            upsertSafetySteps(reqBody.safetySteps, savedLesson.id, reqUser, t)
          );
        }

        // Upsert recipe
        if (reqBody.recipe) {
          promises.push(
            upsertRecipe(reqBody.recipe, savedLesson.id, reqUser, t)
          );
        }

        // Upsert experiment
        if (reqBody.experiment) {
          promises.push(
            upsertExperiment(
              reqBody.experiment,
              savedLesson.id,
              reqUser,
              questionTypes,
              moduleDetails,
              t
            )
          );
        }

        // Upsert activity
        if (reqBody.activity) {
          promises.push(
            upsertActivity(
              reqBody.activity,
              savedLesson.id,
              reqUser,
              questionTypes,
              moduleDetails,
              t
            )
          );
        }

        // Upsert questions
        if (reqBody.questions && reqBody.questions.length) {
          promises.push(
            modelHelper.upsertQuestions(
              reqBody.questions,
              null,
              moduleDetails,
              reqUser,
              savedLesson.id,
              t
            )
          );
        }

        // Upsert multi sensory questions
        if (
          reqBody.multiSensoryQuestions &&
          reqBody.multiSensoryQuestions.length
        ) {
          const mutiSensoryQuestionTypeId = questionTypes.find(
            (f) => f.key === "multiSensory"
          ).id;
          promises.push(
            modelHelper.upsertQuestions(
              reqBody.multiSensoryQuestions,
              mutiSensoryQuestionTypeId,
              moduleDetails,
              reqUser,
              savedLesson.id,
              t
            )
          );
        }

        // // Upsert ela questions
        // if (reqBody.elaQuestions && reqBody.elaQuestions.length) {
        //   let elaQuestionTypeId = questionTypes.find((f) => f.key === "ela").id;
        //   savedELAQuestions = await modelHelper.upsertQuestions(
        //     reqBody.elaQuestions,
        //     elaQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     id
        //   );
        // }

        // // Upsert math questions
        // if (reqBody.mathQuestions && reqBody.mathQuestions.length) {
        //   let mathQuestionTypeId = questionTypes.find((f) => f.key === "math").id;
        //   savedMathQuestions = await modelHelper.upsertQuestions(
        //     reqBody.mathQuestions,
        //     mathQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     id
        //   );
        // }

        // // Upsert NGSS questions
        // if (reqBody.ngssQuestions && reqBody.ngssQuestions.length) {
        //   let ngssQuestionTypeId = questionTypes.find((f) => f.key === "ngss").id;
        //   savedNGSSQuestions = await modelHelper.upsertQuestions(
        //     reqBody.ngssQuestions,
        //     ngssQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     id
        //   );
        // }

        // // Upsert NCSS questions
        // if (reqBody.ncssQuestions && reqBody.ncssQuestions.length) {
        //   let ncssQuestionTypeId = questionTypes.find((f) => f.key === "ncss").id;
        //   savedNCSSQuestions = await modelHelper.upsertQuestions(
        //     reqBody.ncssQuestions,
        //     ncssQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     id
        //   );
        // }

        await Promise.all(promises);
        return savedLesson;
      });
      const schoolData = await User.findAll({
        attributes: { exclude: ["password", "token"] },
        include: [
          {
            model: School,
            required: true,
            attributes: ["id"],
          },
        ],
      });
      let roleId = (await Role.findOne({ where: { title: "School" } })).id;

      let schoolIds;
      let schoolEntities = [];
      let isDistrictEnable, isSchoolEnable, data;
      let templateData;
      schoolIds = schoolData.map((obj) => obj);
      if (schoolData.length > 0) {
        for (const user of schoolIds) {
          data = await modelHelper.getSetting(
            user.id,
            false,
            "notiNewCoursesAvailable"
          );
          isSchoolEnable = await modelHelper.getSetting(
            user.id,
            false,
            "notiReceiveAllNotificationsAsEmails"
          );

          if (data.isEnable == true) {
            schoolEntities.push(user.id);
          }
          templateData = {
            subject: "Notification",
            header: "New lesson available",
            content: `New lesson available with name ${reqBody.lessonTitle}.`,
          };

          if (isSchoolEnable.isEnable) {
            utils.sendEmail(user.email, generalTemplateId, templateData);
          }
        }

        if (schoolEntities.length > 0) {
          await notificationService.createNotifications(
            schoolEntities,
            roleId,
            reqUser.id,
            "new_lesson_available",
            { lessonName: reqBody.lessonTitle }
          );
        }
      }

      const districtData = await User.findAll({
        attributes: { exclude: ["password", "token"] },
        include: [
          {
            model: DistrictAdmin,
            required: true,
            attributes: ["id"],
          },
        ],
      });
      let districtRoleId = (
        await Role.findOne({ where: { title: "District" } })
      ).id;

      let districtIds;
      let districtEntities = [];

      let distData;
      districtIds = districtData.map((obj) => obj);

      if (districtData.length > 0) {
        for (const district of districtIds) {
          distData = await modelHelper.getSetting(
            district.id,
            false,
            "notiNewCoursesAvailable"
          );
          isDistrictEnable = await modelHelper.getSetting(
            district.id,
            false,
            "notiReceiveAllNotificationsAsEmails"
          );

          if (distData.isEnable == true) {
            districtEntities.push(district.id);
          }
        }

        if (districtEntities.length > 0) {
          await notificationService.createNotifications(
            districtEntities,
            districtRoleId,
            reqUser.id,
            "new_lesson_available",
            { lessonName: reqBody.lessonTitle }
          );
        }

        if (isDistrictEnable.isEnable) {
          utils.sendEmail(district.email, generalTemplateId, templateData);
        }
      }

      return utils.responseGenerator(
        StatusCodes.OK,
        "Lesson saved successfully",
        result
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Lesson name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllLessons: async (params) => {
    try {
      let allLessons = [];

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
        allLessons = await Lesson.findAll(query);
      } else {
        allLessons = await Lesson.findAll({
          attributes: [
            "id",
            "lessonTitle",
            "referenceId",
            "systemLanguageId",
            "status",
            "isDeleted",
          ],
          include: [
            // {
            //   model: User,
            //   attributes: ["id", ["email", "name"]],
            // },
            {
              model: Grade,
              attributes: ["id", "grade"],
            },
            // {
            //   model: Activity,
            //   attributes: ["id", "activityTitle"],
            // },
            // {
            //   model: Recipe,
            //   attributes: ["id", "recipeTitle"],
            //   include: [
            //     {
            //       model: Country,
            //       attributes: ["id", "countryName"],
            //     },
            //   ],
            // },
            // {
            //   model: Experiment,
            //   attributes: ["id", "experimentTitle"],
            // },
          ],
          where: {
            isPermanentDeleted: false,
          },
          ...pagging,
        });
      }
      if (allLessons.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No lessons exist",
          []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "All lessons fetched successfully",
          allLessons
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getLesson: async (id) => {
    try {
      let moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });
      const [lessonDetails, recipeDetails, questionDetails] = await Promise.all(
        [
          await Lesson.findOne({
            attributes: [
              "id",
              "lessonTitle",
              "status",
              "learningObjectivesForTeacher",
              "learningObjectivesForStudent",
              "greeting",
              "linguistic",
              // "multiSensoryActivity",
              // "cleanUpStep",
              "funFact",
              "socialStudiesFact",
              "isFeatured",
              "storyTime",
              "assessmentTime",
              "goodbye",
              "goodbyeLinguistic",
              "greetingTrack",
              "goodbyeTrack",
              "referenceId",
              "systemLanguageId",
              "learningObjectivesForTeacherTrack",
              "learningObjectivesForStudentTrack",
              "safetyStepsTrack",
              "cleanupStepsTrack",
            ],
            where: { id: id, isPermanentDeleted: false },
            plain: true,
            include: [
              {
                model: User,
                attributes: ["id", ["email", "name"]],
              },
              {
                model: LessonLink,
                attributes: ["id", ["link", "videoLink"]],
                as: "links",
                separate: true,
              },
              // {
              //   model: Type,
              //   attributes: ["id", "typeTitle"],
              // },
              // {
              //   model: SafetyLevel,
              //   attributes: ["id", "safetyLevelTitle"],
              //   as: "safetyLevel",
              // },
              // {
              //   model: Subject,
              //   attributes: ["id", "subjectTitle"],
              // },
              {
                model: Grade,
                attributes: ["id", "grade"],
              },
              {
                model: SafetyStep,
                attributes: ["id", "text"],
                as: "safetySteps",
                separate: true,
              },
              {
                model: ChefIntroduction,
                attributes: ["id", "text"],
                as: "chefIntroductions",
                separate: true,
              },
              // {
              //   model: MealType,
              //   attributes: ["id", "title"],
              //   as: "mealType",
              // },
              // {
              //   model: DietAndHealth,
              //   attributes: ["id", "title"],
              //   as: "dietAndHealth",
              // },
              {
                model: Language,
                attributes: ["id", "language"],
                as: "language",
              },
              {
                model: CleanupStep,
                attributes: ["id", "text", "image"],
                as: "cleanupSteps",
                separate: true,
              },
              {
                model: TeacherInstruction,
                attributes: ["id", "text"],
                as: "teacherInstructions",
                separate: true,
              },
              {
                model: Activity,
                attributes: [
                  "id",
                  "activityTitle",
                  "image",
                  "description",
                  // "link",
                  // "descriptionEasy",
                  // "descriptionMedium",
                  // "descriptionHard",
                  "estimatedTime",
                ],
                include: [
                  {
                    model: Question,
                    attributes: [
                      "id",
                      "question",
                      "hint",
                      "image",
                      // "descriptionEasy",
                      // "descriptionMedium",
                      // "descriptionHard",
                      "answerTypeId",
                      "estimatedTime",
                      "questionTrack",
                    ],
                    where: { isDelete: false, moduleId: moduleDetails.id },
                    as: "activityQuestions",
                    required: false,
                    separate: true,
                    include: [
                      {
                        model: Answer,
                        attributes: ["id", "option", "image", "isAnswer"],
                        where: { isDelete: false },
                        required: false,
                        separate: true,
                      },
                      {
                        model: QuestionStandard,
                        attributes: ["standardId"],
                        as: "standards",
                        separate: true,
                        include: [
                          {
                            model: Standard,
                            attributes: ["id", "standardTitle"],
                            include: [
                              {
                                model: Subject,
                                attributes: ["id", "subjectTitle"],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        model: QuestionType,
                        attributes: [],
                        where: { key: "activity" },
                      },
                    ],
                  },
                ],
              },
              {
                model: Experiment,
                attributes: [
                  "id",
                  "experimentTitle",
                  // "descriptionEasy",
                  // "descriptionMedium",
                  // "descriptionHard",
                  "estimatedMakeTime",
                  "description",
                  "fact",
                  "experimentStepsTrack",
                ],
                include: [
                  {
                    model: ExperimentStep,
                    attributes: ["id", "text", "link", "image"],
                    as: "experimentSteps",
                    separate: true,
                  },
                  {
                    model: ExperimentTool,
                    attributes: ["toolId"],
                    as: "experimentTools",
                    separate: true,
                    include: [
                      {
                        model: Tool,
                        attributes: ["id", "toolTitle"],
                      },
                    ],
                  },
                  {
                    model: ExperimentIngredient,
                    attributes: ["ingredientId"],
                    as: "experimentIngredients",
                    separate: true,
                    include: [
                      {
                        model: Ingredient,
                        attributes: ["id", "ingredientTitle"],
                      },
                    ],
                  },
                  // {
                  //   model: ExperimentTechnique,
                  //   attributes: ["culinaryTechniqueId"],
                  //   as: "experimentTechniques",
                  //   separate: true,
                  //   include: [
                  //     {
                  //       model: CulinaryTechnique,
                  //       attributes: ["id", "culinaryTechniqueTitle"],
                  //     },
                  //   ],
                  // },
                  {
                    model: Question,
                    attributes: [
                      "id",
                      "question",
                      "hint",
                      "image",
                      // "descriptionEasy",
                      // "descriptionMedium",
                      // "descriptionHard",
                      "answerTypeId",
                      "estimatedTime",
                      "questionTrack",
                    ],
                    where: { isDelete: false, moduleId: moduleDetails.id },
                    as: "experimentQuestions",
                    required: false,
                    separate: true,
                    include: [
                      {
                        model: Answer,
                        attributes: ["id", "option", "image", "isAnswer"],
                        where: { isDelete: false },
                        required: false,
                        separate: true,
                      },
                      {
                        model: QuestionStandard,
                        attributes: ["standardId"],
                        as: "standards",
                        separate: true,
                        include: [
                          {
                            model: Standard,
                            attributes: ["id", "standardTitle"],
                            include: [
                              {
                                model: Subject,
                                attributes: ["id", "subjectTitle"],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        model: QuestionType,
                        attributes: [],
                        where: { key: "experiment" },
                      },
                    ],
                  },
                ],
              },
            ],
          }),
          await Recipe.findOne({
            where: { lessonId: id },
            attributes: [
              "id",
              "recipeTitle",
              "holiday",
              "alternativeName",
              "estimatedMakeTime",
              "serves",
              // "descriptionEasy",
              // "descriptionMedium",
              // "descriptionHard",
              "countryId",
              "recipeImage",
              "preparationStepsTrack",
              "cookingStepsTrack",
              "servingStepsTrack",
              "isChefInHouse",
              "isChefAmbassador",
              "estimatedTimeForCooking",
              "estimatedTimeForPreparation",
            ],
            include: [
              {
                model: Country,
                attributes: ["id", "countryName"],
              },
              {
                model: RecipeIngredient,
                as: "recipeIngredients",
                separate: true,
                attributes: [
                  "id",
                  "ingredientId",
                  "unitOfMeasurementId",
                  "quantity",
                  "image",
                  "quickBlurbText",
                  "quickBlurbImage",
                  "isOptional",
                  "isSpotlight",
                ],
                include: [
                  {
                    model: Ingredient,
                    attributes: ["id", "ingredientTitle"],
                  },
                  {
                    model: UnitOfMeasurement,
                    attributes: ["id", "unitOfMeasure"],
                    as: "unitOfMeasurement",
                  },
                  {
                    model: SpotlightFact,
                    attributes: ["id", "fact"],
                    as: "spotlightFacts",
                    separate: true,
                  },
                ],
              },
              {
                model: RecipeTechnique,
                as: "recipeTechniques",
                separate: true,
                attributes: [
                  "id",
                  "culinaryTechniqueId",
                  // "dialogue",
                  // "animationLink",
                  "estimatedTime",
                ],
                include: [
                  {
                    model: CulinaryTechnique,
                    attributes: ["id", "culinaryTechniqueTitle"],
                    as: "culinaryTechnique",
                  },
                ],
              },
              {
                model: BigChefTool,
                as: "bigChefTools",
                attributes: ["toolId"],
                separate: true,
                include: [
                  {
                    model: Tool,
                    attributes: ["id", "toolTitle"],
                  },
                ],
              },
              {
                model: LittleChefTool,
                as: "littleChefTools",
                attributes: ["toolId"],
                separate: true,
                include: [
                  {
                    model: Tool,
                    attributes: ["id", "toolTitle"],
                  },
                ],
              },
              {
                model: PreparationStep,
                as: "preparationSteps",
                separate: true,
                attributes: [
                  "id",
                  "text",
                  "image",
                  "link",
                  // "estimatedTime",
                  "isApplicableForBigChef",
                  "isApplicableForLittleChef",
                ],
              },
              {
                model: CookingStep,
                as: "cookingSteps",
                separate: true,
                attributes: [
                  "id",
                  "text",
                  "image",
                  "link",
                  // "estimatedTime",
                  "isApplicableForBigChef",
                  "isApplicableForLittleChef",
                ],
              },
              {
                model: ServingStep,
                as: "servingSteps",
                separate: true,
                attributes: [
                  "id",
                  "text",
                  "image",
                  "link",
                  // "descriptionEasy",
                  // "descriptionMedium",
                  // "descriptionHard",
                ],
              },
            ],
          }),
          await Lesson.findOne({
            attributes: [],
            where: { id: id, isPermanentDeleted: false },
            include: [
              {
                model: Question,
                attributes: [
                  "id",
                  "question",
                  "questionTypeId",
                  "hint",
                  "image",
                  // "descriptionEasy",
                  // "descriptionMedium",
                  // "descriptionHard",
                  "answerTypeId",
                  "estimatedTime",
                  "questionTrack",
                ],
                where: { isDelete: false, moduleId: moduleDetails.id },
                // as: "elaQuestions",
                required: false,
                // separate: true,
                include: [
                  {
                    model: Answer,
                    attributes: ["id", "option", "image", "isAnswer"],
                    where: { isDelete: false },
                    required: false,
                    // separate: true,
                  },
                  {
                    model: QuestionStandard,
                    attributes: ["standardId"],
                    as: "standards",
                    // separate: true,
                    include: [
                      {
                        model: Standard,
                        attributes: ["id", "standardTitle"],
                        include: [
                          {
                            model: Subject,
                            attributes: ["id", "subjectTitle"],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    model: QuestionType,
                    attributes: ["id", "title"],
                    where: { key: ["ela", "math", "ngss", "ncss"] },
                  },
                  {
                    model: AnswerType,
                    attributes: ["id", "title"],
                  },
                ],
              },
              {
                model: Question,
                attributes: [
                  "id",
                  "question",
                  "questionTypeId",
                  "hint",
                  "image",
                  // "descriptionEasy",
                  // "descriptionMedium",
                  // "descriptionHard",
                  "answerTypeId",
                  "estimatedTime",
                  "questionTrack",
                ],
                where: { isDelete: false, moduleId: moduleDetails.id },
                as: "multiSensoryQuestions",
                // separate: true,
                required: false,
                include: [
                  {
                    model: QuestionType,
                    attributes: [],
                    where: { key: ["multiSensory"] },
                  },
                ],
              },
            ],
          }),
        ]
      );

      if (!lessonDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No lesson exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Lesson details fetched successfully",
          {
            ...lessonDetails.dataValues,
            recipe: recipeDetails ? { ...recipeDetails.dataValues } : null,
            ...questionDetails.dataValues,
          }
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateLesson: async (reqBody, reqUser, id) => {
    try {
      await db.sequelize.transaction(async (t) => {
        let promises = [];
        const moduleDetails = await ModuleMaster.findOne({
          where: { moduleKey: moduleKey },
          attributes: ["id"],
        });
        const [questionTypes, lessonDetails] = await Promise.all([
          QuestionType.findAll({
            attributes: ["id", "key"],
          }),
          Lesson.findOne({
            attributes: ["id", "storyTime", "assessmentTime", "lessonTime"],
            where: { id: id, isPermanentDeleted: false },
            include: [
              {
                model: Recipe,
                attributes: [
                  "id",
                  "estimatedMakeTime",
                  "estimatedTimeForCooking",
                  "estimatedTimeForPreparation",
                ],
                include: [
                  {
                    model: RecipeTechnique,
                    as: "recipeTechniques",
                    attributes: ["id", "estimatedTime"],
                  },
                ],
              },
              {
                model: Experiment,
                attributes: ["id", "estimatedMakeTime"],
              },
              {
                model: Question,
                attributes: ["id", "estimatedTime"],
                where: { isDelete: false, moduleId: moduleDetails.id },
                as: "multiSensoryQuestions",
                // separate: true,
                required: false,
                include: [
                  {
                    model: QuestionType,
                    attributes: [],
                    where: { key: ["multiSensory"] },
                  },
                ],
              },
            ],
          }),
        ]);

        if (!lessonDetails) {
          return utils.responseGenerator(
            StatusCodes.NOT_FOUND,
            "No lesson exist"
          );
        }

        const lessonTime = calculateLessonTime(reqBody, lessonDetails);
        console.log("-----a--", lessonTime);
        reqBody.updatedBy = reqUser.id;
        reqBody.lessonTime = lessonTime;
        promises.push(
          Lesson.update(reqBody, { where: { id: id }, transaction: t })
        );

        // Upsert lesson links
        if (reqBody.links) {
          promises.push(upsertLessonLinks(reqBody.links, id, reqUser, t));
        }

        // Upsert cleanup steps
        if (reqBody.cleanupSteps && reqBody.cleanupSteps.length) {
          promises.push(
            upsertCleanupSteps(reqBody.cleanupSteps, id, reqUser, t)
          );
        }

        // Upsert teacher instructions
        if (reqBody.teacherInstructions && reqBody.teacherInstructions.length) {
          promises.push(
            upsertTeacherInstrcutions(
              reqBody.teacherInstructions,
              id,
              reqUser,
              t
            )
          );
        }

        // Upsert chef introductions
        if (reqBody.chefIntroductions && reqBody.chefIntroductions.length) {
          promises.push(
            upsertChefIntrocutions(reqBody.chefIntroductions, id, reqUser, t)
          );
        }

        // Upsert safety steps
        if (reqBody.safetySteps && reqBody.safetySteps.length) {
          promises.push(upsertSafetySteps(reqBody.safetySteps, id, reqUser, t));
        }

        // Upsert recipe
        if (reqBody.recipe) {
          promises.push(upsertRecipe(reqBody.recipe, id, reqUser, t));
        }

        // Upsert experiment
        if (reqBody.experiment) {
          promises.push(
            upsertExperiment(
              reqBody.experiment,
              id,
              reqUser,
              questionTypes,
              moduleDetails,
              t
            )
          );
        }

        // Upsert activity
        if (reqBody.activity) {
          promises.push(
            upsertActivity(
              reqBody.activity,
              id,
              reqUser,
              questionTypes,
              moduleDetails,
              t
            )
          );
        }

        // Upsert questions
        if (reqBody.questions && reqBody.questions.length) {
          promises.push(
            modelHelper.upsertQuestions(
              reqBody.questions,
              null,
              moduleDetails,
              reqUser,
              id,
              t
            )
          );
        }

        // Upsert multi sensory questions
        if (
          reqBody.multiSensoryQuestions &&
          reqBody.multiSensoryQuestions.length
        ) {
          const mutiSensoryQuestionTypeId = questionTypes.find(
            (f) => f.key === "multiSensory"
          ).id;
          promises.push(
            modelHelper.upsertQuestions(
              reqBody.multiSensoryQuestions,
              mutiSensoryQuestionTypeId,
              moduleDetails,
              reqUser,
              id,
              t
            )
          );
        }

        // // Upsert ela questions
        // if (reqBody.elaQuestions && reqBody.elaQuestions.length) {
        //   let elaQuestionTypeId = questionTypes.find((f) => f.key === "ela").id;
        //   await modelHelper.upsertQuestions(
        //     reqBody.elaQuestions,
        //     elaQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     id
        //   );
        // }

        // // Upsert math questions
        // if (reqBody.mathQuestions && reqBody.mathQuestions.length) {
        //   let mathQuestionTypeId = questionTypes.find((f) => f.key === "math").id;
        //   await modelHelper.upsertQuestions(
        //     reqBody.mathQuestions,
        //     mathQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     id
        //   );
        // }

        // // Upsert NGSS questions
        // if (reqBody.ngssQuestions && reqBody.ngssQuestions.length) {
        //   let ngssQuestionTypeId = questionTypes.find((f) => f.key === "ncss").id;
        //   await modelHelper.upsertQuestions(
        //     reqBody.ngssQuestions,
        //     ngssQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     id
        //   );
        // }

        // // Upsert NCSS questions
        // if (reqBody.ncssQuestions && reqBody.ncssQuestions.length) {
        //   let ncssQuestionTypeId = questionTypes.find((f) => f.key === "ncss").id;
        //   await modelHelper.upsertQuestions(
        //     reqBody.ncssQuestions,
        //     ncssQuestionTypeId,
        //     moduleDetails,
        //     reqUser,
        //     id
        //   );
        // }
        await Promise.all(promises);
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "Lesson details updated Successfully"
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Lesson name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  deleteLesson: async (id) => {
    try {
      await db.sequelize.transaction(async (t) => {
        const [moduleDetails, recipe, experiment] = await Promise.all([
          ModuleMaster.findOne({
            where: { moduleKey: moduleKey },
            attributes: ["id"],
          }),
          Recipe.findOne({
            attributes: ["id"],
            where: { lessonId: id },
          }),
          Experiment.findOne({
            attributes: ["id"],
            where: { lessonId: id },
          }),
        ]);

        await ChefIntroduction.destroy({
          where: {
            lessonId: id,
          },
          transaction: t,
        });

        await SafetyStep.destroy({
          where: {
            lessonId: id,
          },
          transaction: t,
        });

        await CleanupStep.destroy({
          where: {
            lessonId: id,
          },
          transaction: t,
        });

        await TeacherInstruction.destroy({
          where: {
            lessonId: id,
          },
          transaction: t,
        });

        // Delete recipe
        if (recipe) {
          await BigChefTool.destroy({
            where: {
              recipeId: recipe.id,
            },
            transaction: t,
          });

          await LittleChefTool.destroy({
            where: {
              recipeId: recipe.id,
            },
            transaction: t,
          });

          await RecipeTechnique.destroy({
            where: {
              recipeId: recipe.id,
            },
            transaction: t,
          });

          await RecipeIngredient.destroy({
            where: {
              recipeId: recipe.id,
            },
            transaction: t,
          });

          await PreparationStep.destroy({
            where: {
              recipeId: recipe.id,
            },
            transaction: t,
          });

          await CookingStep.destroy({
            where: {
              recipeId: recipe.id,
            },
            transaction: t,
          });

          await ServingStep.destroy({
            where: {
              recipeId: recipe.id,
            },
            transaction: t,
          });

          await Recipe.destroy({
            where: {
              lessonId: id,
            },
            transaction: t,
          });
        }

        // Delete experiemtns
        if (experiment) {
          // await ExperimentTechnique.destroy({
          //   where: {
          //     experimentId: experiment.id,
          //   },
          //   transaction: t,
          // });

          await ExperimentTool.destroy({
            where: {
              experimentId: experiment.id,
            },
            transaction: t,
          });

          await ExperimentIngredient.destroy({
            where: {
              experimentId: experiment.id,
            },
            transaction: t,
          });

          await ExperimentStep.destroy({
            where: {
              experimentId: experiment.id,
            },
            transaction: t,
          });

          await Experiment.destroy({
            where: {
              lessonId: id,
            },
            transaction: t,
          });
        }

        // Delete activity
        await Activity.destroy({
          where: {
            lessonId: id,
          },
          transaction: t,
        });

        await LessonLink.destroy({
          where: {
            lessonId: id,
          },
          transaction: t,
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

        await Lesson.destroy({
          where: {
            id: id,
          },
          transaction: t,
        });
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "Lesson details deleted Successfully"
      );
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(
          StatusCodes.NO_CONTENT,
          "You cannot delete this lesson, it's already being used"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  createLessonFromFile: async (reqBody, reqUser) => {
    try {
      let recordCount = { success: 0, faliure: 0, conflict: 0, skip: 0 };
      const filePath = excelUploadLocation + "/" + reqBody.fileName;
      let excelData = fileParser.fileParser(filePath);

      const [
        grades,
        languages,
        countries,
        tools,
        ingredients,
        unitOfMeasurements,
        culinaryTechniques,
        answerTypes,
      ] = await Promise.all([
        Grade.findAll({
          attributes: ["id", "grade"],
          // where: { status: true },
        }),
        Language.findAll({
          attributes: ["id", "language"],
          where: { status: true },
        }),
        Country.findAll({
          attributes: ["id", "countryName"],
          where: { status: true },
        }),
        Tool.findAll({
          attributes: ["id", "toolTitle"],
          where: { status: true },
        }),
        Ingredient.findAll({
          attributes: ["id", "ingredientTitle"],
          where: { status: true },
        }),
        UnitOfMeasurement.findAll({
          attributes: ["id", "unitOfMeasure"],
          where: { status: true },
        }),
        CulinaryTechnique.findAll({
          attributes: ["id", "culinaryTechniqueTitle"],
          where: { status: true },
        }),
        AnswerType.findAll({
          attributes: ["id", "key"],
          where: { status: true },
        }),
      ]);

      let promiseRes = await Promise.allSettled(
        excelData.map((e) => {
          try {
            const lesson = {
              ...e,
              status: false,
              chefIntroductions: [{ text: e.chefIntroduction }],
              teacherInstructions: [{ text: e.teacherInstruction }],
              safetySteps: [{ text: e.safetyStep }],
              isFeatured: e.isFeatured === "yes",
              storyTime: e.estimatedStoryTime,
              gradeId: grades.find((g) => g.grade === e.grade).id,
              languageId: languages.find((l) => l.language === e.language).id,
              cleanupSteps: [
                {
                  text: e.cleanupStepText,
                },
              ],
              recipe: {
                recipeTitle: e.recipeTitle,
                estimatedMakeTime: e.recipeEstimatedMakeTime,
                alternativeName: e.alternativeName,
                serves: e.serves,
                countryId: countries.find((c) => c.countryName === e.country)
                  .id,
                bigChefTools: [
                  tools.find((t) => t.toolTitle === e.bigChefTool).id,
                ],
                littleChefTools: [
                  tools.find((t) => t.toolTitle === e.littleChefTool).id,
                ],
                recipeIngredients: [
                  {
                    ingredientId: ingredients.find(
                      (i) => i.ingredientTitle === e.recipeIngredient
                    ).id,
                    unitOfMeasurementId: unitOfMeasurements.find(
                      (u) => u.unitOfMeasure === e.unitOfMeasurement
                    ).id,
                    quantity: e.quantity,
                  },
                ],
                recipeTechniques: [
                  {
                    culinaryTechniqueId: culinaryTechniques.find(
                      (c) => c.culinaryTechniqueTitle === e.recipeTechnique
                    ).id,
                    // dialogue: e.dialogue,
                  },
                ],
                preparationSteps: [
                  {
                    text: e.preparationStepText,
                    // estimatedTime: e.preparationStepEstimatedTime,
                    isApplicableForBigChef: e.isApplicableForBigChef === "yes",
                    isApplicableForLittleChef:
                      e.isApplicableForLittleChef === "yes",
                  },
                ],
                cookingSteps: [
                  {
                    text: e.cookingStepText,
                    // estimatedTime: e.cookingStepEstimatedTime,
                    isApplicableForBigChef: e.isApplicableForBigChef === "yes",
                    isApplicableForLittleChef:
                      e.isApplicableForLittleChef === "yes",
                  },
                ],
              },
              experiment: {
                experimentTitle: e.experimentTitle,
                estimatedMakeTime: e.experimentEstimatedTime,
                // experimentIngredients: [
                //   ingredients.find(
                //     (i) => i.ingredientTitle === e.experimentIngredient
                //   ).id,
                // ],
                // experimentTools: [
                //   tools.find((t) => t.toolTitle === e.experimentTool).id,
                // ],
                // experimentTechniques: [
                //   culinaryTechniques.find(
                //     (c) => c.culinaryTechniqueTitle === e.experimentTechnique
                //   ).id,
                // ],
                experimentSteps: [
                  {
                    text: e.experimentStepText,
                  },
                ],
              },
              activity: {
                activityTitle: e.activityTitle,
                description: e.activityDescription,
                estimatedTime: e.activityEstimatedTime,
                activityQuestions: [
                  {
                    answerTypeId: answerTypes.find((a) => a.key === "none").id,
                    question: e.activityQuestion1,
                    answers: [],
                  },
                  {
                    answerTypeId: answerTypes.find((a) => a.key === "none").id,
                    question: e.activityQuestion2,
                    answers: [],
                  },
                ],
              },
            };
            return module.exports.createLesson(lesson, reqUser);
          } catch (err) {
            ++recordCount.skip;
          }
        })
      );
      recordCount.success = promiseRes.reduce((acc, record) => {
        return record.status === "fulfilled" &&
          record.value &&
          record.value.status === 200
          ? acc + 1
          : acc;
      }, 0);
      recordCount.faliure = promiseRes.reduce((acc, record) => {
        return record.status === "rejected" ? acc + 1 : acc;
      }, 0);
      recordCount.conflict = promiseRes.reduce((acc, record) => {
        return record.status === "fulfilled" &&
          record.value &&
          record.value.status === 409
          ? acc + 1
          : acc;
      }, 0);
      fs.unlinkSync(filePath);
      return utils.responseGenerator(
        StatusCodes.OK,
        "Lesson details saved successfully",
        recordCount
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllLessonsGroupByGrades: async () => {
    try {
      const allLessons = await Grade.findAll({
        attributes: [
          "id",
          "grade",
          [
            db.Sequelize.fn("count", db.Sequelize.col("lessons.id")),
            "lessonCount",
          ],
        ],
        group: ["id"],
        include: [
          {
            model: Lesson,
            required: false,
            group: ["grade_id"],
            attributes: [],
            where: { isPermanentDeleted: false },
          },
        ],
      });

      if (allLessons.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No lessons exist",
          []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "All lessons fetched successfully",
          allLessons
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
};

async function upsertLessonLinks(links, lessonId, reqUser, t) {
  try {
    if (!links.length) {
      await LessonLink.destroy({
        where: {
          lessonId: lessonId,
        },
        transaction: t,
      });
    } else {
      let linkIds = links.filter((e) => e.id).map((e) => e.id);
      await LessonLink.destroy({
        where: {
          lessonId: lessonId,
          id: { [db.Sequelize.Op.notIn]: linkIds },
        },
        transaction: t,
      });

      let lessonLinksEntity = links.map((e) => {
        return {
          id: e.id,
          lessonId: lessonId,
          link: e.videoLink || e,
          [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
        };
      });
      let savedLessonLinks = await LessonLink.bulkCreate(lessonLinksEntity, {
        fields: ["id", "lessonId", "link", "createdBy", "updatedBy"],
        updateOnDuplicate: ["link", "updatedBy"],
        transaction: t,
      });
      return savedLessonLinks;
    }
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertCleanupSteps(cleanupSteps, lessonId, reqUser, t) {
  try {
    let cleanupStepIds = cleanupSteps
      .filter((step) => step.id)
      .map((step) => step.id);

    await CleanupStep.destroy({
      where: {
        lessonId: lessonId,
        id: { [db.Sequelize.Op.notIn]: cleanupStepIds },
      },
      transaction: t,
    });

    let cleanupStepsEntity = cleanupSteps.map((e) => {
      return {
        id: e.id,
        lessonId: lessonId,
        text: e.text,
        image: e.image,
        [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
      };
    });

    await CleanupStep.bulkCreate(cleanupStepsEntity, {
      fields: ["id", "lessonId", "text", "image", "createdBy", "updatedBy"],
      updateOnDuplicate: ["text", "image", "updatedBy"],
      transaction: t,
    });
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertTeacherInstrcutions(instructions, lessonId, reqUser, t) {
  try {
    let instructionsIds = instructions
      .filter((ins) => ins.id)
      .map((ins) => ins.id);

    await TeacherInstruction.destroy({
      where: {
        lessonId: lessonId,
        id: { [db.Sequelize.Op.notIn]: instructionsIds },
      },
      transaction: t,
    });

    let instructionsEntity = instructions.map((e) => {
      return {
        id: e.id,
        lessonId: lessonId,
        text: e.text,
        [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
      };
    });

    await TeacherInstruction.bulkCreate(instructionsEntity, {
      fields: ["id", "lessonId", "text", "createdBy", "updatedBy"],
      updateOnDuplicate: ["text", "updatedBy"],
      transaction: t,
    });
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertChefIntrocutions(chefIntroductions, lessonId, reqUser, t) {
  try {
    let chefIntroductionIds = chefIntroductions
      .filter((e) => e.id)
      .map((e) => e.id);

    await ChefIntroduction.destroy({
      where: {
        lessonId: lessonId,
        id: { [db.Sequelize.Op.notIn]: chefIntroductionIds },
      },
      transaction: t,
    });

    let chefIntroductionsEntity = chefIntroductions.map((e) => {
      return {
        id: e.id,
        lessonId: lessonId,
        text: e.text || e,
        [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
      };
    });
    let savedChefIntroductions = await ChefIntroduction.bulkCreate(
      chefIntroductionsEntity,
      {
        fields: ["id", "lessonId", "text", "createdBy", "updatedBy"],
        updateOnDuplicate: ["text", "updatedBy"],
        transaction: t,
      }
    );
    return savedChefIntroductions;
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertSafetySteps(safetySteps, lessonId, reqUser, t) {
  try {
    let safetyStepIds = safetySteps.filter((e) => e.id).map((e) => e.id);

    await SafetyStep.destroy({
      where: {
        lessonId: lessonId,
        id: { [db.Sequelize.Op.notIn]: safetyStepIds },
      },
      transaction: t,
    });

    let safetyStepsEntity = safetySteps.map((e) => {
      return {
        id: e.id,
        lessonId: lessonId,
        text: e.text || e,
        [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
      };
    });
    let savedSafetySteps = await SafetyStep.bulkCreate(safetyStepsEntity, {
      fields: ["id", "lessonId", "text", "createdBy", "updatedBy"],
      updateOnDuplicate: ["text", "updatedBy"],
      transaction: t,
    });
    return savedSafetySteps;
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertRecipe(recipe, lessonId, reqUser, t) {
  try {
    let promises = [];
    let recipeEntity = {
      ...recipe,
      lessonId: lessonId,
      [recipe.id ? "updatedBy" : "createdBy"]: reqUser.id,
    };

    let savedRecipe = await Recipe.upsert(recipeEntity, { transaction: t });

    recipe = {
      id: savedRecipe[0].id,
      ...recipe,
    };

    if (recipe.bigChefTools)
      promises.push(upsertBigChefTools(recipe, reqUser, t));
    if (recipe.littleChefTools)
      promises.push(upsertLittleChefTools(recipe, reqUser, t));
    if (recipe.recipeIngredients)
      promises.push(upsertRecipeIngredients(recipe, reqUser, t));
    if (recipe.recipeTechniques)
      promises.push(upsertRecipeTechniques(recipe, reqUser, t));
    if (recipe.preparationSteps)
      promises.push(upsertPreparationSteps(recipe, reqUser, t));
    if (recipe.cookingSteps)
      promises.push(upsertCookingSteps(recipe, reqUser, t));
    if (recipe.servingSteps)
      promises.push(upsertServingSteps(recipe, reqUser, t));

    await Promise.all(promises);

    return savedRecipe[0];
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertExperiment(
  experiment,
  lessonId,
  reqUser,
  questionTypes,
  moduleDetails,
  t
) {
  try {
    let promises = [];
    let experimentEntity = {
      ...experiment,
      lessonId: lessonId,
      [experiment.id ? "updatedBy" : "createdBy"]: reqUser.id,
    };

    let savedExperiment = await Experiment.upsert(experimentEntity, {
      transaction: t,
    });

    experiment = {
      id: savedExperiment[0].id,
      ...experiment,
    };

    // Upsert experiment questions
    if (experiment.experimentQuestions) {
      let experimentQuestionTypeId = questionTypes.find(
        (f) => f.key === "experiment"
      ).id;

      await modelHelper.upsertQuestions(
        experiment.experimentQuestions,
        experimentQuestionTypeId,
        moduleDetails,
        reqUser,
        experiment.id,
        t
      );
    }

    if (experiment.experimentIngredients)
      promises.push(upsertExperimentIngredients(experiment, reqUser, t));
    // if (experiment.experimentTechniques)
    //   promises.push(upsertExperimentTechniques(experiment, reqUser, t));
    if (experiment.experimentTools)
      promises.push(upsertExperimentTools(experiment, reqUser, t));
    if (experiment.experimentSteps)
      promises.push(upsertExperimentSteps(experiment, reqUser, t));
    await Promise.all(promises);
    return savedExperiment[0];
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertActivity(
  activity,
  lessonId,
  reqUser,
  questionTypes,
  moduleDetails,
  t
) {
  try {
    let activityEntity = {
      ...activity,
      lessonId: lessonId,
      [activity.id ? "updatedBy" : "createdBy"]: reqUser.id,
    };
    let savedActivity = await Activity.upsert(activityEntity, {
      transaction: t,
    });

    activity = {
      id: savedActivity[0].id,
      ...activity,
    };

    // Upsert experiment questions
    if (activity.activityQuestions) {
      let activityQuestionTypeId = questionTypes.find(
        (f) => f.key === "activity"
      ).id;

      await modelHelper.upsertQuestions(
        activity.activityQuestions,
        activityQuestionTypeId,
        moduleDetails,
        reqUser,
        activity.id,
        t
      );
    }

    return savedActivity[0];
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertRecipeIngredients(recipe, reqUser, t) {
  try {
    let recipeIngredientIds = recipe.recipeIngredients
      .filter((x) => x.id)
      .map((e) => e.id);

    await RecipeIngredient.destroy({
      where: {
        recipeId: recipe.id,
        id: { [db.Sequelize.Op.notIn]: recipeIngredientIds },
      },
      transaction: t,
    });

    let recipeIngredientsEntity = recipe.recipeIngredients.map((e) => {
      {
        return {
          id: e.id,
          recipeId: recipe.id,
          ingredientId: e.ingredientId,
          unitOfMeasurementId: e.unitOfMeasurementId,
          quantity: e.quantity,
          image: e.image,
          quickBlurbText: e.quickBlurbText,
          quickBlurbImage: e.quickBlurbImage,
          isOptional: e.isOptional,
          isSpotlight: e.isSpotlight,
          [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
        };
      }
    });
    await RecipeIngredient.bulkCreate(recipeIngredientsEntity, {
      fields: [
        "id",
        "recipeId",
        "ingredientId",
        "unitOfMeasurementId",
        "quantity",
        "image",
        "quickBlurbText",
        "quickBlurbImage",
        "isOptional",
        "isSpotlight",
        "createdBy",
        "updatedBy",
      ],
      updateOnDuplicate: [
        "unitOfMeasurementId",
        "quantity",
        "image",
        "quickBlurbText",
        "quickBlurbImage",
        "isOptional",
        "isSpotlight",
        "updatedBy",
      ],
      transaction: t,
    });

    let savedRecipeIngredients = await RecipeIngredient.findAll({
      where: {
        recipeId: recipe.id,
      },
      transaction: t,
    });

    let recipeIngredients = recipe.recipeIngredients.map((m) => {
      return {
        id: savedRecipeIngredients.find(
          (f) => f.ingredientId === m.ingredientId
        ).id,
        ...m,
      };
    });

    // Upsert spotlight facts
    await upsertSpotlightFacts(recipeIngredients, reqUser, t);
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertRecipeTechniques(recipe, reqUser, t) {
  try {
    let recipeTechniqueIds = recipe.recipeTechniques
      .filter((x) => x.id)
      .map((e) => e.id);

    await RecipeTechnique.destroy({
      where: {
        recipeId: recipe.id,
        id: { [db.Sequelize.Op.notIn]: recipeTechniqueIds },
      },
      transaction: t,
    });
    let recipeTechniquesEntity = recipe.recipeTechniques.map((e) => {
      {
        return {
          id: e.id,
          recipeId: recipe.id,
          culinaryTechniqueId: e.culinaryTechniqueId,
          // dialogue: e.dialogue,
          // animationLink: e.animationLink,
          [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
        };
      }
    });
    await RecipeTechnique.bulkCreate(recipeTechniquesEntity, {
      fields: [
        "id",
        "recipeId",
        "culinaryTechniqueId",
        // "dialogue",
        // "animationLink",
        "createdBy",
        "updatedBy",
      ],
      updateOnDuplicate: [
        // "dialogue",
        // "animationLink",
        "updatedBy",
      ],
      transaction: t,
    });
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertPreparationSteps(recipe, reqUser, t) {
  try {
    let preparationStepIds = recipe.preparationSteps
      .filter((x) => x.id)
      .map((e) => e.id);

    await PreparationStep.destroy({
      where: {
        recipeId: recipe.id,
        id: { [db.Sequelize.Op.notIn]: preparationStepIds },
      },
      transaction: t,
    });

    let preparationStepsEntity = recipe.preparationSteps.map((e) => {
      {
        return {
          id: e.id,
          recipeId: recipe.id,
          text: e.text,
          image: e.image,
          link: e.link,
          // estimatedTime: e.estimatedTime,
          isApplicableForBigChef: e.isApplicableForBigChef,
          isApplicableForLittleChef: e.isApplicableForLittleChef,
          [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
        };
      }
    });

    await PreparationStep.bulkCreate(preparationStepsEntity, {
      fields: [
        "id",
        "recipeId",
        "text",
        "image",
        "link",
        // "estimatedTime",
        "isApplicableForBigChef",
        "isApplicableForLittleChef",
        "createdBy",
        "updatedBy",
      ],
      updateOnDuplicate: [
        "text",
        "image",
        "link",
        // "estimatedTime",
        "isApplicableForBigChef",
        "isApplicableForLittleChef",
        "updatedBy",
      ],
      transaction: t,
    });
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertCookingSteps(recipe, reqUser, t) {
  try {
    let cookingStepIds = recipe.cookingSteps
      .filter((x) => x.id)
      .map((e) => e.id);

    await CookingStep.destroy({
      where: {
        recipeId: recipe.id,
        id: { [db.Sequelize.Op.notIn]: cookingStepIds },
      },
      transaction: t,
    });

    let cookingStepsEntity = recipe.cookingSteps.map((e) => {
      {
        return {
          id: e.id,
          recipeId: recipe.id,
          text: e.text,
          image: e.image,
          link: e.link,
          // estimatedTime: e.estimatedTime,
          isApplicableForBigChef: e.isApplicableForBigChef,
          isApplicableForLittleChef: e.isApplicableForLittleChef,
          [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
        };
      }
    });

    await CookingStep.bulkCreate(cookingStepsEntity, {
      fields: [
        "id",
        "recipeId",
        "text",
        "image",
        "link",
        // "estimatedTime",
        "isApplicableForBigChef",
        "isApplicableForLittleChef",
        "createdBy",
        "updatedBy",
      ],
      updateOnDuplicate: [
        "text",
        "image",
        "link",
        // "estimatedTime",
        "isApplicableForBigChef",
        "isApplicableForLittleChef",
        "updatedBy",
      ],
      transaction: t,
    });
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertServingSteps(recipe, reqUser, t) {
  try {
    let servingStepIds = recipe.servingSteps
      .filter((x) => x.id)
      .map((e) => e.id);

    await ServingStep.destroy({
      where: {
        recipeId: recipe.id,
        id: { [db.Sequelize.Op.notIn]: servingStepIds },
      },
      transaction: t,
    });

    let servingStepsEntity = recipe.servingSteps.map((e) => {
      {
        return {
          id: e.id,
          recipeId: recipe.id,
          text: e.text,
          image: e.image,
          link: e.link,
          // descriptionEasy: e.descriptionEasy,
          // descriptionMedium: e.descriptionMedium,
          // descriptionHard: e.descriptionHard,
          [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
        };
      }
    });

    await ServingStep.bulkCreate(servingStepsEntity, {
      fields: [
        "id",
        "recipeId",
        "text",
        "image",
        "link",
        // "descriptionEasy",
        // "descriptionMedium",
        // "descriptionHard",
        "createdBy",
        "updatedBy",
      ],
      updateOnDuplicate: [
        "text",
        "image",
        "link",
        // "descriptionEasy",
        // "descriptionMedium",
        // "descriptionHard",
        "updatedBy",
      ],
      transaction: t,
    });
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertBigChefTools(recipe, reqUser, t) {
  try {
    await BigChefTool.destroy({
      where: {
        recipeId: recipe.id,
      },
      transaction: t,
    });

    let bigChefToolsEntity = recipe.bigChefTools.map((toolId) => {
      return { recipeId: recipe.id, toolId: toolId, createdBy: reqUser.id };
    });
    await BigChefTool.bulkCreate(bigChefToolsEntity, { transaction: t });
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertLittleChefTools(recipe, reqUser, t) {
  try {
    await LittleChefTool.destroy({
      where: {
        recipeId: recipe.id,
      },
      transaction: t,
    });
    let littleChefToolsEntity = recipe.littleChefTools.map((toolId) => {
      return { recipeId: recipe.id, toolId: toolId, createdBy: reqUser.id };
    });
    await LittleChefTool.bulkCreate(littleChefToolsEntity, { transaction: t });
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertExperimentIngredients(experiment, reqUser, t) {
  try {
    await ExperimentIngredient.destroy({
      where: {
        experimentId: experiment.id,
      },
      transaction: t,
    });

    let experimentIngredientsEntity = experiment.experimentIngredients.map(
      (ingredientId) => {
        return {
          experimentId: experiment.id,
          ingredientId: ingredientId,
          createdBy: reqUser.id,
        };
      }
    );
    await ExperimentIngredient.bulkCreate(experimentIngredientsEntity, {
      transaction: t,
    });
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertExperimentTechniques(experiment, reqUser, t) {
  try {
    await ExperimentTechnique.destroy({
      where: {
        experimentId: experiment.id,
      },
      transaction: t,
    });

    let experimentTechniquesEntity = experiment.experimentTechniques.map(
      (culinaryTechniqueId) => {
        return {
          experimentId: experiment.id,
          culinaryTechniqueId: culinaryTechniqueId,
          createdBy: reqUser.id,
        };
      }
    );
    await ExperimentTechnique.bulkCreate(experimentTechniquesEntity, {
      transaction: t,
    });
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertExperimentTools(experiment, reqUser, t) {
  try {
    await ExperimentTool.destroy({
      where: {
        experimentId: experiment.id,
      },
      transaction: t,
    });
    let experimentToolsEntity = experiment.experimentTools.map((toolId) => {
      return {
        experimentId: experiment.id,
        toolId: toolId,
        createdBy: reqUser.id,
      };
    });
    await ExperimentTool.bulkCreate(experimentToolsEntity, { transaction: t });
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertExperimentSteps(experiment, reqUser, t) {
  try {
    let experimentStepIds = experiment.experimentSteps
      .filter((step) => step.id)
      .map((step) => step.id);

    await ExperimentStep.destroy({
      where: {
        experimentId: experiment.id,
        id: { [db.Sequelize.Op.notIn]: experimentStepIds },
      },
      transaction: t,
    });

    let experimentStepsEntity = experiment.experimentSteps.map((e) => {
      return {
        id: e.id,
        experimentId: experiment.id,
        text: e.text,
        link: e.link,
        image: e.image,
        [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
      };
    });

    await ExperimentStep.bulkCreate(experimentStepsEntity, {
      fields: [
        "id",
        "experimentId",
        "text",
        "link",
        "image",
        "createdBy",
        "updatedBy",
      ],
      updateOnDuplicate: ["text", "link", "updatedBy"],
      transaction: t,
    });
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

async function upsertSpotlightFacts(recipeIngredients, reqUser, t) {
  try {
    for (const ingredient of recipeIngredients) {
      if (ingredient.spotlightFacts) {
        let spotlightFactdIds = ingredient.spotlightFacts
          .filter((fact) => fact.id)
          .map((fact) => fact.id);

        await SpotlightFact.destroy({
          where: {
            recipeIngredientId: ingredient.id,
            id: { [db.Sequelize.Op.notIn]: spotlightFactdIds },
          },
          transaction: t,
        });
      }
    }
    let spotlightFactsEntity = [];
    for (const ingredient of recipeIngredients) {
      if (ingredient.spotlightFacts) {
        spotlightFactsEntity.push(
          ingredient.spotlightFacts.map((e) => {
            return {
              id: e.id,
              recipeIngredientId: ingredient.id,
              fact: e.fact || e,
              [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
            };
          })
        );
      }
    }
    await SpotlightFact.bulkCreate(spotlightFactsEntity.flat(), {
      fields: ["id", "recipeIngredientId", "fact", "createdBy", "updatedBy"],
      updateOnDuplicate: ["fact", "updatedBy"],
      transaction: t,
    });
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

function calculateLessonTime(reqBody, lessonDetails = {}) {
  let lessonTime = 0;

  // sotry time
  lessonTime += !isNaN(reqBody.storyTime)
    ? parseInt(reqBody.storyTime)
    : lessonDetails.storyTime || 0;

  // assessment time
  lessonTime += !isNaN(reqBody.assessmentTime)
    ? parseInt(reqBody.assessmentTime)
    : lessonDetails.assessmentTime || 0;

  // recipe time
  lessonTime +=
    reqBody.recipe &&
    reqBody.recipe.estimatedMakeTime &&
    !isNaN(reqBody.recipe.estimatedMakeTime)
      ? parseInt(reqBody.recipe.estimatedMakeTime)
      : lessonDetails.recipe && lessonDetails.recipe.estimatedMakeTime
      ? lessonDetails.recipe.estimatedMakeTime
      : 0;

  // cooking time
  lessonTime +=
    reqBody.recipe &&
    reqBody.recipe.estimatedTimeForCooking &&
    !isNaN(reqBody.recipe.estimatedTimeForCooking)
      ? parseInt(reqBody.recipe.estimatedTimeForCooking)
      : lessonDetails.recipe && lessonDetails.recipe.estimatedTimeForCooking
      ? lessonDetails.recipe.estimatedTimeForCooking
      : 0;

  // preperation time
  lessonTime +=
    reqBody.recipe &&
    reqBody.recipe.estimatedTimeForPreparation &&
    !isNaN(reqBody.recipe.estimatedTimeForPreparation)
      ? parseInt(reqBody.recipe.estimatedTimeForPreparation)
      : lessonDetails.recipe && lessonDetails.recipe.estimatedTimeForPreparation
      ? lessonDetails.recipe.estimatedTimeForPreparation
      : 0;

  // recipe techniques time
  if (reqBody.recipe && reqBody.recipe.recipeTechniques) {
    reqBody.recipe.recipeTechniques.forEach((technique) => {
      lessonTime += !isNaN(technique.estimatedTime)
        ? parseInt(technique.estimatedTime)
        : lessonDetails.recipe && lessonDetails.recipe.recipeTechniques
        ? lessonDetails.recipe.recipeTechniques.find(
            (e) => e.id == technique.id
          ).estimatedTime
        : 0;
    });
  } else if (lessonDetails.recipe && lessonDetails.recipe.recipeTechniques) {
    lessonDetails.recipe.recipeTechniques.forEach(
      (technique) => (lessonTime += technique.estimatedTime || 0)
    );
  }

  // experiment time
  lessonTime +=
    reqBody.experiment &&
    reqBody.experiment.estimatedMakeTime &&
    !isNaN(reqBody.experiment.estimatedMakeTime)
      ? parseInt(reqBody.experiment.estimatedMakeTime)
      : lessonDetails.experiment && lessonDetails.experiment.estimatedMakeTime
      ? lessonDetails.experiment.estimatedMakeTime
      : 0;

  // multisensory time
  if (reqBody.multiSensoryQuestions) {
    reqBody.multiSensoryQuestions.forEach((question) => {
      lessonTime += !isNaN(question.estimatedTime)
        ? parseInt(question.estimatedTime)
        : lessonDetails.multiSensoryQuestions
        ? lessonDetails.multiSensoryQuestions.find((e) => e.id == question.id)
            .estimatedTime
        : 0;
    });
  } else if (lessonDetails.multiSensoryQuestions) {
    lessonDetails.multiSensoryQuestions.forEach(
      (question) => (lessonTime += question.estimatedTime || 0)
    );
  }

  return lessonTime;
}
