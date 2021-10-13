"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("questions", "description_easy");
    await queryInterface.removeColumn("questions", "description_medium");
    await queryInterface.removeColumn("questions", "description_hard");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("questions", "description_easy", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("questions", "description_medium", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("questions", "description_hard", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
