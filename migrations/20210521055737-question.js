"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("questions", "description_easy", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "image",
    });
    await queryInterface.addColumn("questions", "description_medium", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "description_easy",
    });
    await queryInterface.addColumn("questions", "description_hard", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "description_medium",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("questions", "description_easy");
    await queryInterface.removeColumn("questions", "description_medium");
    await queryInterface.removeColumn("questions", "description_hard");
  },
};
