"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("lessons", "assessment_time", {
      type: Sequelize.INTEGER,
      after: "story_time",
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("lessons", "assessment_time");
  },
};
