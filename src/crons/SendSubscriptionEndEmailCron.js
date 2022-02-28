var CronJob = require("cron").CronJob;
let utils = require("../helpers/utils");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const subscriptionPlanExpirationTemplateId =
  config.sendgrid.subscription_plan_expiration_template_id;
const SubscribePackage = require("../models").subscribe_packages;
const User = require("../models").users;
const Role = require("../models").roles;
const Student = require("../models").students;
const beforeDays = 7;
const emailSubject = "Subscription Plan Expiration";

async function SendSubscriptionEndEmailCron() {
  var job = new CronJob(
    "0 0 0 * * *",
    // "0/10 * * * * *",
    async () => {
      console.log(
        " ************ SendSubscriptionEndEmailCron started at " +
          new Date() +
          "************"
      );

      let date = new Date();
      date.setDate(date.getDate() + (beforeDays - 1));

      let subscribePackageDetails = await SubscribePackage.findAll({
        where: {
          subscriptionEndDate: date,
          isActive: true,
          isPaymentPaid: true,
        },
      });

      if (subscribePackageDetails.length) {
        let studentRole = await Role.findOne({
          attributes: ["id"],
          where: { title: "Student", isMaster: true },
        });

        let users = await User.findAll({
          where: {
            id: subscribePackageDetails
              .filter((f) => f.roleId !== studentRole.id)
              .map((e) => e.entityId),
          },
        });

        let students = await Student.findAll({
          where: {
            id: subscribePackageDetails
              .filter((f) => f.roleId === studentRole.id)
              .map((e) => e.entityId),
          },
        });

        let emailsAndTemplateData = users.map((e) => {
          return {
            to: e.email,
            dynamic_template_data: {
              expiration_date: subscribePackageDetails.find(
                (f) => f.entityId === e.id && f.roleId !== studentRole.id
              ).subscriptionEndDate,
            },
          };
        });

        emailsAndTemplateData = emailsAndTemplateData.concat(
          students.map((e) => {
            return {
              to: e.contactPersonEmail,
              dynamic_template_data: {
                expiration_date: subscribePackageDetails.find(
                  (f) => f.entityId === e.id && f.roleId === studentRole.id
                ).subscriptionEndDate,
              },
            };
          })
        );

        await utils.sendBulkEmails(
          emailsAndTemplateData,
          subscriptionPlanExpirationTemplateId,
          emailSubject
        );
      }
      console.log(
        " ************ SendSubscriptionEndEmailCron completed at " +
          new Date() +
          "************"
      );
    },
    null,
    true
    // "America/Los_Angeles"
  );
  job.start();
}

module.exports = SendSubscriptionEndEmailCron;
