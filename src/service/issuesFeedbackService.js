"use strict";

let IssuesFeedback = require("../models").issues_feedbacks;
let ReportIssue = require("../models").report_issues;
let Role = require("../models").roles;
let utils = require("../helpers/utils");
let { StatusCodes } = require("http-status-codes");
let User = require("../models").users;
let School = require("../models").schools;
let DistrictAdmin = require("../models").district_admins;

const Op = require("sequelize").Op;

module.exports = {
  getIssuesFeedback: async (id) => {
    try {
      let issuesFeedbackDetail = await IssuesFeedback.findOne({
        where: { reportIssueId: id },
        include: [
          {
            model: ReportIssue,
            attributes: [
              "id",
              "description",
              "attachment",
              "type",
              "createdAt",
            ],
            include: [
              {
                model: User,
                attributes: ["id", "email"],
                include: [
                  {
                    model: Role,
                    attributes: ["id", "title"],
                  },
                ],
              },
              {
                model: School,
                attributes: ["id", "admin_account_name"],
              },
              {
                model: DistrictAdmin,
                attributes: ["id", "admin_account_name"],
              },
            ],
          },
        ],
      });

      if (!issuesFeedbackDetail) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No Issues Feedback Exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Issues Feedback Fetched Successfully",
          issuesFeedbackDetail
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
  getAllIssuesFeedback: async () => {
    try {
      let issuesFeedbackDetails = await IssuesFeedback.findAll({
        include: [
          {
            model: ReportIssue,
            attributes: [
              "id",
              "description",
              "attachment",
              "type",
              "createdAt",
            ],
            where: {
              description: {
                [Op.ne]: null,
              },
            },
            include: [
              {
                model: User,
                attributes: ["id", "email"],
                include: [
                  {
                    model: Role,
                    attributes: ["id", "title"],
                  },
                ],
              },
              {
                model: School,
                attributes: ["id", "admin_account_name"],
              },
              {
                model: DistrictAdmin,
                attributes: ["id", "admin_account_name"],
              },
            ],
          },
        ],
      });
      return utils.responseGenerator(
        StatusCodes.OK,
        "Issues feedback Fetched Successfully",
        issuesFeedbackDetails
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updateIssuesFeedback: async (reqBody, reqUser, id) => {
    try {
      reqBody.updatedBy = reqUser.id;
      const updatedIssuesFeedback = await IssuesFeedback.update(reqBody, {
        where: { id: id },
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "Issues Feedback Updated Successfully",
        updatedIssuesFeedback
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
