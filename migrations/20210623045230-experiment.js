"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("experiments", "estimated_make_time", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "lesson_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("experiments", "estimated_make_time");
  },
};
