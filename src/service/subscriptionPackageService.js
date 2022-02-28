require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
// const Lesson = require("../models").lessons;
const Role = require("../models").roles;
const SubscriptionPackage = require("../models").subscription_packages;
// const SubscriptionPackagePlan = require("../models").subscription_package_plans;
// const SubscriptionPackageLesson = require("../models").subscription_package_lessons;
let utils = require("../helpers/utils");
let { StatusCodes } = require("http-status-codes");
let { UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");
let modelHelper = require("../helpers/modelHelper");
let stripeHelper = require("../helpers/stripeHelper");
const rootPath = config.web_portal_root_path;
const districtRegistrationPath = config.web_portal_district_registration_path;
const schoolRegistrationPath = config.web_portal_school_registration_path;
const teacherRegistrationPath = config.web_portal_teacher_registration_path;
const studentRegistrationPath = config.web_portal_student_registration_path;

module.exports = {
  createSubscriptionPackage: async (reqBody, reqUser) => {
    try {
      let intervalCount = countInterval(
        reqBody.validityFrom,
        reqBody.validityTo,
        reqBody.gracePeriod
      );

      const product = await stripeHelper.createProduct(
        reqBody.packageTitle,
        reqBody.description,
        reqBody.status
      );

      const price = await stripeHelper.createPrice(
        reqBody.price,
        intervalCount,
        product.id
      );

      reqBody.createdBy = reqUser.id;
      reqBody.productId = product.id;
      reqBody.priceId = price.id;
  
      const savedPackage = await SubscriptionPackage.create(reqBody);
      // let plan = {
      //   packageId: savedPackage.id,
      //   priceId: price.id,
      // };
      // await SubscriptionPackagePlan.create(plan);

      // // upset subscription package lessons
      // upsertSubscriptionPackageLessons(
      //   reqBody.lessons,
      //   savedPackage.id,
      //   reqUser
      // );

      // generate shareable link
      if (reqBody.isPrivate)
        await upsertShareableLink(savedPackage, reqBody, reqUser);

      return utils.responseGenerator(
        StatusCodes.OK,
        "Subscription package saved successfully",
        savedPackage
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Subscription package name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getAllSubscriptionPackages: async (params) => {
    try {
      let allPackages = [];
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
        allPackages = await SubscriptionPackage.findAll(query);
      } else {
        allPackages = await SubscriptionPackage.findAll({
          attributes: ["id", "packageTitle", "isPrivate", "status"],
          ...pagging,
        });
      }
      if (allPackages.length === 0) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No packages exist", []
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "All packages fetched successfully",
          allPackages
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  getsubscriptionPackage: async (id) => {
    try {
      const packageDetails = await SubscriptionPackage.findOne({
        attributes: [
          "id",
          "packageTitle",
          "validityFrom",
          "validityTo",
          "maxUser",
          "price",
          "gracePeriod",
          "packageFor",
          "status",
          "isPrivate",
          "shareableLink",
          "description",
        ],
        where: { id: id },
        // include: [
        //   {
        //     model: SubscriptionPackageLesson,
        //     attributes: ["id"],
        //     as: "lessons",
        //     include: [
        //       {
        //         model: Lesson,
        //         attributes: ["id", "lessonTitle"],
        //       },
        //     ],
        //   },
        // ],
      });
      if (!packageDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No packages Exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Packages details fetched Successfully",
          packageDetails
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  updatesubscriptionPackage: async (reqBody, reqUser, id) => {
    try {
      let packageDetails = await SubscriptionPackage.findOne({
        where: { id: id },
      });
      if (!packageDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No subscription package exist"
        );
      }

      reqBody.updatedBy = reqUser.id;

      // generate shareable link
      // if (reqBody.isPrivate)
      //   await upsertShareableLink(packageDetails, reqBody, reqUser, "u");
      // else reqBody.shareableLink = null;

      await SubscriptionPackage.update(reqBody, { where: { id: id } });

      // // Update product
      // if (
      //   reqBody.packageTitle !== packageDetails.packageTitle ||
      //   reqBody.description !== packageDetails.description ||
      //   reqBody.status !== packageDetails.status
      // ) {
      //   await stripeHelper.updateProduct(
      //     packageDetails.productId,
      //     reqBody.packageTitle,
      //     reqBody.description,
      //     reqBody.status
      //   );
      // }

      // // Update price
      // if (
      //   parseFloat(packageDetails.price).toFixed(2) != packageDetails.price ||
      //   reqBody.validityFrom != packageDetails.validityFrom ||
      //   reqBody.validityTo != packageDetails.validityTo ||
      //   reqBody.gracePeriod != packageDetails.gracePeriod
      // ) {
      //   let intervalCount = countInterval(
      //     reqBody.validityFrom,
      //     reqBody.validityTo,
      //     reqBody.gracePeriod
      //   );
      //   const price = await stripeHelper.createPrice(
      //     reqBody.price,
      //     intervalCount,
      //     packageDetails.productId
      //   );

      //   let plan = {
      //     packageId: id,
      //     priceId: price.id,
      //   };
      //   await SubscriptionPackagePlan.update(
      //     { status: false },
      //     {
      //       where: { packageId: id, status: true },
      //     }
      //   );
      //   await SubscriptionPackagePlan.create(plan);
      // }
      // // upset subscription package lessons
      // upsertSubscriptionPackageLessons(reqBody.lessons, id, reqUser);

      return utils.responseGenerator(
        StatusCodes.OK,
        "Subscription package details updated Successfully"
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Subscription package name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  deletesubscriptionPackage: async (id) => {
    try {
      // await SubscriptionPackageLesson.destroy({
      //   where: {
      //     packageId: id,
      //   },
      // });

      // await SubscriptionPackagePlan.destroy({
      //   where: {
      //     packageId: id,
      //   },
      // });

      const deletedPackage = await SubscriptionPackage.destroy({
        where: {
          id: id,
        },
      });

      return utils.responseGenerator(
        StatusCodes.OK,
        "Subscription package details deleted Successfully",
        deletedPackage
      );
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(
          StatusCodes.NO_CONTENT,
          "You cannot delete this subscription package, it's already being used"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },
};

// async function upsertSubscriptionPackageLessons(lessonIds, packageId, reqUser) {
//   try {
//     await SubscriptionPackageLesson.destroy({
//       where: {
//         packageId: packageId,
//       },
//     });

//     let subscriptionPackageLessonsEntity = lessonIds.map((id) => {
//       return {
//         packageId: packageId,
//         lessonId: id,
//         createdBy: reqUser.id,
//       };
//     });
//     let savedSubscriptionPackageLessons =
//       await SubscriptionPackageLesson.bulkCreate(
//         subscriptionPackageLessonsEntity
//       );

//     return savedSubscriptionPackageLessons;
//   } catch (err) {
//     console.log("Error ==> ", err);
//     throw err;
//   }
// }

async function upsertShareableLink(package, reqBody, reqUser, from = "c") {
  try {
    // Here c = create and u = update
    if (
      from === "u" &&
      package.packageFor === reqBody.packageFor &&
      package.shareableLink
    )
      return;
    const role = await Role.findOne({
      attributes: ["id", "title"],
      where: { id: reqBody.packageFor },
    });
    let shareableLink = "";
    switch (role.title) {
      case "District":
        shareableLink = `${rootPath}${districtRegistrationPath}?role_id=${package.packageFor}&packageId=${package.id}`;
        break;
      case "School":
        shareableLink = `${rootPath}${schoolRegistrationPath}?role_id=${package.packageFor}&packageId=${package.id}`;
        break;
      case "Teacher":
        shareableLink = `${rootPath}${teacherRegistrationPath}?role_id=${package.packageFor}&packageId=${package.id}`;
        break;
      case "Student":
        shareableLink = `${rootPath}${studentRegistrationPath}?role_id=${package.packageFor}&packageId=${package.id}`;
        break;
      default:
        console.log(
          "Not able to generate shareable link, Master role not found"
        );
    }
    return await SubscriptionPackage.update(
      {
        shareableLink:
          shareableLink.split("?")[0] +
          "?" +
          utils.encrypt(shareableLink.split("?")[1]),
        updatedBy: reqUser.id,
      },
      { where: { id: package.id } }
    );
  } catch (err) {
    console.log("Error ==> ", err);
    throw err;
  }
}

function countInterval(validityFrom, validityTo, gracePeriod) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  let currentYear = new Date().getFullYear();

  let [dateFrom, dateTo] = [
    new Date(currentYear, --validityFrom),
    new Date(
      validityFrom > validityTo ? ++currentYear : currentYear,
      validityTo
    ),
  ];
  // let diffDays = Math.round(Math.abs((dateFrom - dateTo) / oneDay));
  // diffDays += gracePeriod;
  let intervalCount =
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear());
  intervalCount = intervalCount ? intervalCount : 12;

  return intervalCount;
}
