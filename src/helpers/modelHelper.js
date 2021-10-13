require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const db = require("../models/index");
const Question = require("../models").questions;
const Answer = require("../models").answers;
const QuestionType = require("../models").question_types;
const AnswerType = require("../models").answer_types;
const QuestionStandard = require("../models").question_standards;
const Image = require("../models").images;
const User = require("../models").users;
const Role = require("../models").roles;
const Setting = require("../models").settings;
let District = require("../models/").district_admins;
let DistrictUser = require("../models/").district_users;
let School = require("../models/").schools;
let SchoolUser = require("../models/").school_users;
let Teacher = require("../models/").teachers;

async function entityDetails(userId) {
  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    const loggedUserRole = user.roleId;
    let loggedUserRoleDetail = await Role.findOne({
      where: { id: loggedUserRole },
    });

    const data = { userId };
    if (loggedUserRoleDetail && loggedUserRoleDetail.title != "Super Admin") {

      data.roleId = user.parent_role_id ? user.parent_role_id : user.roleId;
      data.isSubUser = user.parent_role_id ? true : false;
      const { title } = await Role.findOne({ where: { id: data.roleId } });
      let DB;
      data.entityType = title.toLowerCase();
      if (data.entityType == "district")
        DB = data.isSubUser ? DistrictUser : District;
      else if (data.entityType == "school")
        DB = data.isSubUser ? SchoolUser : School;
      else if (data.entityType == "teacher") DB = Teacher;
      else return undefined;
      data.DB = DB;
      const entityDetails = await DB.findOne({
        attributes: ["id"],
        where: { user_id: userId },
      });
      data.entityId = entityDetails.id;
      if (data.entityType == "district" && data.isSubUser) {
        data.parentId = user.createdBy;
        data.parentEntityId = entityDetails.district_id;
      }
      if (data.entityType == "school" && data.isSubUser) {
        data.parentId = user.createdBy;
        data.parentEntityId = entityDetails.school_id;
      }
      data.rootParentId = entityDetails.parentId;
    } else data.entityType = loggedUserRoleDetail.title.toLowerCase();
    return data;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  upsertRelatedQuestions: async (
    relatedQuestions,
    transactionId,
    moduleDetails,
    reqUser,
    t
  ) => {
    try {
      let questionType = await QuestionType.findOne({
        attributes: ["id", "key"],
        where: { key: "related" },
      });

      let answerType = await AnswerType.findOne({
        attributes: ["id", "key"],
        where: { key: "none" },
      });

      let questionIds = relatedQuestions
        .filter((question) => question.id)
        .map((question) => question.id);

      await Question.update(
        { isDelete: true },
        {
          where: {
            transactionId: transactionId,
            id: { [db.Sequelize.Op.notIn]: questionIds },
            moduleId: moduleDetails.id,
            questionTypeId: questionType.id,
          },
          transaction: t,
        }
      );

      let relatedQuestionsEntity = relatedQuestions.map((e) => {
        return {
          id: e.id,
          question: e.question || e,
          questionTypeId: questionType.id,
          answerTypeId: answerType.id,
          transactionId: transactionId,
          moduleId: moduleDetails.id,
          [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
        };
      });
      let savedRelatedQuestions = await Question.bulkCreate(
        relatedQuestionsEntity,
        {
          fields: [
            "id",
            "question",
            "transactionId",
            "moduleId",
            "questionTypeId",
            "answerTypeId",
            "createdBy",
            "updatedBy",
          ],
          updateOnDuplicate: ["question", "answerTypeId", "updatedBy"],
          transaction: t,
        }
      );
      return savedRelatedQuestions;
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  upsertQuestions: async (
    questionAnswers,
    questionTypeId,
    moduleDetails,
    reqUser,
    transactionId,
    t
  ) => {
    try {
      let questionIds = questionAnswers
        .filter((question) => question.id)
        .map((question) => question.id);

      let answerIds = questionAnswers.flatMap(({ answers }) =>
        answers.filter((ans) => ans.id).map((ans) => ans.id)
      );

      let standardIds = questionAnswers.flatMap(
        ({ standards }) =>
          standards || [].filter((std) => std).map((std) => std)
      );

      updateWhere = {
        transactionId: transactionId,
        id: { [db.Sequelize.Op.notIn]: questionIds },
        moduleId: moduleDetails.id,
      };
      if (questionTypeId) updateWhere.questionTypeId = questionTypeId;

      await Promise.all([
        Question.update(
          { isDelete: true },
          {
            where: updateWhere,
            transaction: t,
          }
        ),
        Answer.update(
          { isDelete: true },
          {
            where: {
              id: { [db.Sequelize.Op.notIn]: answerIds },
              questionId: questionIds,
            },
            transaction: t,
          }
        ),
        QuestionStandard.destroy({
          where: {
            // standardId: { [db.Sequelize.Op.notIn]: standardIds },
            standardId: standardIds,
            questionId: questionIds,
          },
          transaction: t,
        }),
      ]);

      let questionsEntity = questionAnswers.map((e) => {
        return {
          id: e.id,
          transactionId: transactionId,
          moduleId: moduleDetails.id,
          questionTypeId: questionTypeId || e.questionTypeId,
          answerTypeId: e.answerTypeId,
          question: e.question,
          image: e.image,
          hint: e.hint,
          estimatedTime: e.estimatedTime,
          questionTrack: e.questionTrack,
          // descriptionEasy: e.descriptionEasy,
          // descriptionMedium: e.descriptionMedium,
          // descriptionHard: e.descriptionHard,
          [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
        };
      });

      let savedQuestions = await Question.bulkCreate(questionsEntity, {
        fields: [
          "id",
          "question",
          "transactionId",
          "moduleId",
          "questionTypeId",
          "answerTypeId",
          "hint",
          "image",
          "estimatedTime",
          "questionTrack",
          // "descriptionEasy",
          // "descriptionMedium",
          // "descriptionHard",
          "createdBy",
          "updatedBy",
        ],
        updateOnDuplicate: [
          "question",
          "questionTypeId",
          "answerTypeId",
          "hint",
          "image",
          "estimatedTime",
          "questionTrack",
          // "descriptionEasy",
          // "descriptionMedium",
          // "descriptionHard",
          "updatedBy",
        ],
        // returning: true,
        // individualHooks: true,
        transaction: t,
      });

      savedQuestions = await Question.findAll({
        where: {
          transactionId: transactionId,
          moduleId: moduleDetails.id,
          isDelete: false,
        },
        transaction: t,
      });
      let answersEntity = [];
      questionAnswers.forEach((question) => {
        let questionId = savedQuestions.find(
          (f) =>
            f.question == question.question && f.transactionId == transactionId
        ).id;
        if (question.answers && question.answers.length) {
          answersEntity = answersEntity.concat(
            question.answers.map((e) => {
              return {
                id: e.id,
                questionId: questionId,
                option: e.option,
                isAnswer: e.isAnswer,
                image: e.image || "",
                [e.id ? "updatedBy" : "createdBy"]: reqUser.id,
              };
            })
          );
        }
      });

      await Answer.bulkCreate(answersEntity, {
        fields: [
          "id",
          "questionId",
          "option",
          "isAnswer",
          "image",
          "createdBy",
          "updatedBy",
        ],
        updateOnDuplicate: ["option", "isAnswer", "image", "updatedBy"],
        transaction: t,
      });

      let questionStandardsEntity = [];
      questionAnswers.forEach((question) => {
        let questionId = savedQuestions.find(
          (f) =>
            f.question == question.question && f.transactionId == transactionId
        ).id;
        if (question.standards && question.standards.length) {
          questionStandardsEntity = questionStandardsEntity.concat(
            question.standards.map((id) => {
              return {
                questionId: questionId,
                standardId: id,
                createdBy: reqUser.id,
              };
            })
          );
        }
      });

      await QuestionStandard.bulkCreate(questionStandardsEntity, {
        transaction: t,
      });

      return;
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  upsertImageData: async (images, transactionId, moduleDetails, reqUser, t) => {
    let whereClause = {
      where: {
        transactionId: transactionId,
        moduleId: moduleDetails.id,
      },
    };
    if (t) whereClause.transaction = t;
    await Image.destroy(whereClause);

    let imageEntity = images.map((e) => {
      return {
        image: e.image || e,
        transactionId: transactionId,
        moduleId: moduleDetails.id,
        createdBy: reqUser.id,
      };
    });
    let savedImages = t
      ? await Image.bulkCreate(imageEntity, { transaction: t })
      : await Image.bulkCreate(imageEntity);
    return savedImages;
  },

  getAccessibleIds: async function (userIds) {
    try {
      userIds = Array.isArray(userIds) ? userIds : [userIds];
      const users = await User.findAll({
        where: { createdBy: userIds },
        attributes: ["id"],
      });
      let accessibleIds = [];
      let ids = users.map((e) => e.id);
      if (ids.length)
        accessibleIds = accessibleIds.concat(
          ids,
          await this.getAccessibleIds(ids)
        );
      return accessibleIds;
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  queryBuilder: async function (param) {
    try {
      let query = { include: [], where: {} };
      if (param.fields) {
        for (model in param.fields) {
          if (model === "root")
            query.attributes = JSON.parse(param.fields.root);
          else {
            query.include.push({
              model: db[model],
              attributes: JSON.parse(param.fields[model]),
            });
          }
        }
      }

      if (param.filters) {
        for (model in param.filters) {
          if (model === "root") {
            JSON.parse(param.filters.root).forEach((e) => {
              if (e.o) {
                query.where[e.f] = {
                  [db.Sequelize.Op[e.o]]: e.v,
                };
              } else query.where[e.f] = e.v;
            });
          } else if (param.filters[model]) {
            let nestedWhere = {};
            JSON.parse(param.filters[model]).forEach((e) => {
              if (e.o) {
                nestedWhere[e.f] = {
                  [db.Sequelize.Op[e.o]]: e.v,
                };
              } else nestedWhere[e.f] = e.v;
            });
            query.include = query.include.map((e) => {
              if (e.model === db[model]) e.where = nestedWhere;
              return e;
            });
          }
        }
      }
      return query;
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getSetting: async (userId, isStudent, key) => {
    try {
      let entityId;
      let roleId;
      if (isStudent) {
        entityId = userId;
        roleId = (await Role.findOne({ where: { title: "Student" } })).id;
      } else {
        const details = await entityDetails(userId);
        entityId = details.entityId;
        roleId = details.roleId; // Note: for district user and school user roleId is their parent role id
      }
      let data = await Setting.findOne({ where: { entityId, roleId, key } });
      return data;
    } catch (err) {
      throw err;
    }
  },
};
