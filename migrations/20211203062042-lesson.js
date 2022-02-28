"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("lessons", "lesson_time", {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      after: "assessment_time",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("lessons", "lesson_time");
  },
};
