"use strict";
const Country = require("../models").countries;
const Language = require("../models").languages;
const Grade = require("../models").grades;
const Image = require("../models").images;
let utils = require("../helpers/utils");
let { StatusCodes } = require("http-status-codes");
const CountryLanguage = require("../models").country_languages;
const CountryGrade = require("../models").country_grades;
let modelHelper = require("../helpers/modelHelper");
const ModuleMaster = require("../models").module_master;
const moduleKey = "country";
let { UniqueConstraintError, ForeignKeyConstraintError } = require("sequelize");

module.exports = {
  createCountry: async (reqBody, reqUser) => {
    try {
      reqBody.createdBy = reqUser.id;
      const moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });
      const savedCountry = await Country.create(reqBody);
      let savedImages = await modelHelper.upsertImageData(
        reqBody.images,
        savedCountry.id,
        moduleDetails,
        reqUser
      );
      await upsertCountryLanguages(reqBody, savedCountry.id, reqUser);
      await upsertCountryGrades(reqBody, savedCountry.id, reqUser);

      return utils.responseGenerator(
        StatusCodes.OK,
        "Countries saved successfully",
        {
          ...savedCountry.dataValues,
          ...{
            images: savedImages.map((m) => {
              return {
                id: m.id,
                image: m.image,
              };
            }),
          },
        }
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Country name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },
  getAllCountries: async (params) => {
    try {
      let allCountries = [];
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
        allCountries = await Country.findAll(query);
      } else {
        const moduleDetails = await ModuleMaster.findOne({
          where: { moduleKey: moduleKey },
          attributes: ["id"],
        });

        allCountries = await Country.findAll({
          attributes: [
            "id",
            "countryName",
            "referenceId",
            "systemLanguageId",
            "status",
          ],
          include: [
            {
              model: CountryLanguage,
              attributes: ["id"],
              include: [
                {
                  model: Language,
                  attributes: ["id", "language"],
                },
              ],
            },
            {
              model: CountryGrade,
              attributes: ["id"],
              include: [
                {
                  model: Grade,
                  attributes: ["id", "grade"],
                },
              ],
            },
            {
              model: Image,
              attributes: ["id", "image"],
              where: { module_id: moduleDetails.id },
            },
          ],
          ...pagging,
        });
      }

      return utils.responseGenerator(
        StatusCodes.OK,
        "All countries fetched successfully",
        allCountries
      );
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
  getCountry: async (id) => {
    try {
      const moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });
      const countryDetails = await Country.findOne({
        where: { id: id },
        include: [
          {
            model: CountryLanguage,
            attributes: ["id"],
            include: [
              {
                model: Language,
                attributes: ["id", "language"],
              },
            ],
          },
          {
            model: CountryGrade,
            attributes: ["id"],
            include: [
              {
                model: Grade,
                attributes: ["id", "grade"],
              },
            ],
          },
          {
            model: Image,
            attributes: ["id", "image"],
            where: {
              transactionId: id,
              moduleId: moduleDetails.id,
            },
          },
        ],
      });
      if (!countryDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No country Exist"
        );
      } else {
        return utils.responseGenerator(
          StatusCodes.OK,
          "Country fetched Successfully",
          countryDetails
        );
      }
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
  updateCountry: async (reqBody, id, reqUser) => {
    try {
      let countryDetails = await Country.findOne({
        attributes: ["id"],
        where: { id: id },
      });
      if (!countryDetails) {
        return utils.responseGenerator(
          StatusCodes.NOT_FOUND,
          "No country Exist"
        );
      }
      const moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });
      reqBody.updatedBy = reqUser.id;
      await Country.update(reqBody, { where: { id: id } });
      await upsertCountryLanguages(reqBody, id, reqUser);
      await upsertCountryGrades(reqBody, id, reqUser);
      // Upsert image data
      let upsertImages = await modelHelper.upsertImageData(
        reqBody.images,
        id,
        moduleDetails,
        reqUser
      );

      return utils.responseGenerator(
        StatusCodes.OK,
        "Country details updated Successfully",
        {
          ...{
            images: upsertImages.map((m) => {
              return {
                id: m.id,
                image: m.image,
              };
            }),
          },
        }
      );
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return utils.responseGenerator(
          StatusCodes.CONFLICT,
          "Country name already exist"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },
  deleteCountry: async (id) => {
    try {
      await CountryGrade.destroy({
        where: {
          countryId: id,
        },
      });
      await CountryLanguage.destroy({
        where: {
          countryId: id,
        },
      });
      const moduleDetails = await ModuleMaster.findOne({
        where: { moduleKey: moduleKey },
        attributes: ["id"],
      });

      await Image.destroy({
        where: {
          transactionId: id,
          moduleId: moduleDetails.id,
        },
      });
      const deleteCountry = await Country.destroy({
        where: {
          id: id,
        },
      });
      return utils.responseGenerator(
        StatusCodes.OK,
        "Country details deleted Successfully",
        deleteCountry
      );
    } catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        return utils.responseGenerator(
          StatusCodes.NO_CONTENT,
          "You cannot delete this country, it's already being used"
        );
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },
};

async function upsertCountryLanguages(reqBody, countryId, reqUser) {
  await CountryLanguage.destroy({
    where: {
      countryId: countryId,
    },
  });

  let countryLanguageEntity = reqBody.languages.map((languageId) => {
    return {
      countryId: countryId,
      languageId: languageId.id,
      createdBy: reqBody.createdBy,
      updatedBy: reqUser.id,
    };
  });
  let savedCountryLanguages = await CountryLanguage.bulkCreate(
    countryLanguageEntity
  );
  return savedCountryLanguages;
}
async function upsertCountryGrades(reqBody, countryId, reqUser) {
  await CountryGrade.destroy({
    where: {
      countryId: countryId,
    },
  });

  let countryGradeEntity = reqBody.grades.map((gradeId) => {
    return {
      countryId: countryId,
      gradeId: gradeId.id,
      createdBy: reqBody.createdBy,
      updatedBy: reqUser.id,
    };
  });
  let savedCountryGrades = await CountryGrade.bulkCreate(countryGradeEntity);
  return savedCountryGrades;
}
