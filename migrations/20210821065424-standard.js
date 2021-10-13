"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("standards", "grade_id", {
      type: Sequelize.INTEGER,
      after: "system_language_id",
      references: {
        model: "grades",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("standards", "district_id");
  },
};
