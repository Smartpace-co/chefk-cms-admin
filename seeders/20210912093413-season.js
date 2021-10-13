"use strict";
let utils = require("../src/helpers/utils");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("seasons", [
      {
        title: "Fall",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Winter",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Spring",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Summer",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("seasons", null, {});
  },
};
