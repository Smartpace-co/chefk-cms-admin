"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("recipes", "description_easy");
    await queryInterface.removeColumn("recipes", "description_medium");
    await queryInterface.removeColumn("recipes", "description_hard");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("recipes", "description_easy", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("recipes", "description_medium", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("recipes", "description_hard", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
