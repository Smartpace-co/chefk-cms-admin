"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("activities", "estimated_time", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after : "lesson_id"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("activities", "estimated_time");
  },
};
