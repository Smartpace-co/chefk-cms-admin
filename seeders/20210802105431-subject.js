"use strict";
let utils = require("../src/helpers/utils");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("subjects", [
      {
        title: "CC Math",
        system_language_id: 1,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "NGSS",
        system_language_id: 1,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "ELA",
        system_language_id: 1,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "NCSS",
        system_language_id: 1,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },     
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("subjects", null, {});
  },
};
