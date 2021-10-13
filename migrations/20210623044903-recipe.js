"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("recipes", "image", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "lesson_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("recipes", "image");
  },
};
