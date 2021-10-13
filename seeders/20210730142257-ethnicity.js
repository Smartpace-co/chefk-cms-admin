"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    await queryInterface.bulkDelete("ethnicities", {
      title: "British",
    });

    queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("ethnicities", [
      {
        title: "British",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
};
