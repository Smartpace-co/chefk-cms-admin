var CronJob = require("cron").CronJob;
let utils = require("../helpers/utils");
let stripeHelper = require("../helpers/stripeHelper");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const subscriptionRenewalTemplateId =
  config.sendgrid.subscription_renewal_template_id;
const SubscribePackage = require("../models").subscribe_packages;
const SubscriptionPackage = require("../models").subscription_packages;
const User = require("../models").users;
const Role = require("../models").roles;
const Student = require("../models").students;
const DistrictAdmin = require("../models").district_admins;
const School = require("../models").schools;
const Teacher = require("../models").teachers;
let modelHelper = require("../helpers/modelHelper");
const beforeDays = 7;
const emailSubject = "Subscription Renewal";

async function SendSubscriptionRenewalEmailCron() {
  var job = new CronJob(
    "0 0 * * * *",
    // "0/10 * * * * *",
    async () => {
      console.log(
        " ************ SendSubscriptionRenewalEmailCron started at " +
          new Date() +
          "************"
      );

      // let date = new Date(2021, 6, 28);
      let date = new Date();
      date.setDate(date.getDate() + (beforeDays - 1));

      let subscribePackageDetails = await SubscribePackage.findAll({
        where: {
          subscriptionRenewalDate: date,
          isActive: true,
          isPaymentPaid: true,
          // isOwner: true,
        },
        include: [
          {
            model: SubscriptionPackage,
            attributes: ["priceId"],
          },
        ],
      });

      if (subscribePackageDetails.length) {
        let currentYear = new Date().getFullYear();
        let newSubscriptionData = [];

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
          include: [
            {
              model: Role,
              attributes: ["title"],
            },
          ],
        });

        let students = await Student.findAll({
          where: {
            id: subscribePackageDetails
              .filter((f) => f.roleId === studentRole.id)
              .map((e) => e.entityId),
          },
        });

        let emailsAndTemplateData = await Promise.all(
          users.map(async (e) => {
            let model = "";
            if (e.role.title === "District") {
              model = DistrictAdmin;
            } else if (e.role.title === "Teacher") {
              model = Teacher;
            } else if (e.role.title === "School") {
              model = School;
            } else if (parentRole && parentRole.title) {
              if (parentRole.title === "District") {
                model = DistrictUser;
              } else if (parentRole.title === "School") {
                model = SchoolUser;
              }
            }

            let userDetails = await model.findOne({
              where: { user_id: e.id },
            });

            let subscribePackage = subscribePackageDetails.find(
              (f) => f.entityId === e.id && f.roleId !== studentRole.id
            );

            const session = await stripeHelper.createSession(
              subscribePackage.subscription_package,
              userDetails.customerId,
              subscribePackage.id,
              subscribePackage.subscription_package.priceId
            );

            let subscriptionEndDate = new Date(
                subscribePackage.subscription_package.validityFrom >
                subscribePackage.subscription_package.validityTo
                  ? currentYear + 1
                  : currentYear,
                subscribePackage.subscription_package.validityTo,
                0
              ),
              gracePeriodStartDate = new Date(subscriptionEndDate),
              gracePeriodEndDate = new Date(subscriptionEndDate),
              subscriptionRenewalDate = new Date(
                currentYear + 1,
                subscribePackage.subscription_package.validityFrom - 1 === 0
                  ? 12
                  : subscribePackage.subscription_package.validityFrom - 1,
                0
              );
            gracePeriodStartDate.setDate(gracePeriodStartDate.getDate() + 1);
            gracePeriodEndDate.setDate(
              gracePeriodEndDate.getDate() +
                subscribePackage.subscription_package.gracePeriod
            );
            subscriptionRenewalDate.setDate(
              subscriptionRenewalDate.getDate() + 1
            );

            newSubscriptionData.push({
              uuid: await utils.getUUID("SP"),
              entityId: subscribePackage.entityId,
              roleId: subscribePackage.roleId,
              packageId: subscribePackage.packageId,
              sessionId: session.id,
              subscriptionEndDate,
              gracePeriodStartDate,
              gracePeriodEndDate,
              subscriptionRenewalDate,
            });

            return {
              to: e.email,
              dynamic_template_data: {
                checkout_link: session.url,
              },
            };
          })
        );

        const studentSettings = await Promise.all(
          students.map((e) =>
            modelHelper.getSetting(
              e.id,
              studentRole.id,
              "membershipPaymentIsDueToParent"
            )
          )
        );

        emailsAndTemplateData = await Promise.all(
          emailsAndTemplateData.concat(
            students
              .filter((f) => {
                const { isEnable } = studentSettings.find(
                  (s) => s.entityId == f.id
                );
                if (isEnable) return true;
              })
              .map(async (e) => {
                let subscribePackage = subscribepackagedetails.find(
                  (f) => f.entityId === e.id && f.roleId === studentRole.id
                );

                const session = await stripeHelper.createSession(
                  subscribePackage.subscription_package,
                  e.customerId,
                  subscribePackage.id,
                  subscribePackage.subscription_package.priceId
                );

                let subscriptionEndDate = new Date(
                    subscribePackage.subscription_package.validityFrom >
                    subscribePackage.subscription_package.validityTo
                      ? currentYear + 1
                      : currentYear,
                    subscribePackage.subscription_package.validityTo,
                    0
                  ),
                  gracePeriodStartDate = new Date(subscriptionEndDate),
                  gracePeriodEndDate = new Date(subscriptionEndDate),
                  subscriptionRenewalDate = new Date(
                    currentYear + 1,
                    subscribePackage.subscription_package.validityFrom - 1 === 0
                      ? 12
                      : subscribePackage.subscription_package.validityFrom - 1,
                    0
                  );
                gracePeriodStartDate.setDate(
                  gracePeriodStartDate.getDate() + 1
                );
                gracePeriodEndDate.setDate(
                  gracePeriodEndDate.getDate() +
                    subscribePackage.subscription_package.gracePeriod
                );
                subscriptionRenewalDate.setDate(
                  subscriptionRenewalDate.getDate() + 1
                );

                newSubscriptionData.push({
                  uuid: await utils.getUUID("SP"),
                  entityId: subscribePackage.entityId,
                  roleId: subscribePackage.roleId,
                  packageId: subscribePackage.packageId,
                  sessionId: session.id,
                  subscriptionEndDate,
                  gracePeriodStartDate,
                  gracePeriodEndDate,
                  subscriptionRenewalDate,
                });

                return {
                  to: e.contactPersonEmail,
                  dynamic_template_data: {
                    checkout_link: session.url,
                  },
                };
              })
          )
        );

        await SubscribePackage.update(
          { isActive: false },
          { where: { id: subscribePackageDetails.map((e) => e.id) } }
        );

        await SubscribePackage.bulkCreate(newSubscriptionData);

        await utils.sendBulkEmails(
          emailsAndTemplateData,
          subscriptionRenewalTemplateId,
          emailSubject
        );
      }
      console.log(
        " ************ SendSubscriptionRenewalEmailCron completed at " +
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

module.exports = SendSubscriptionRenewalEmailCron;
