"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("experiments", "description_easy");
    await queryInterface.removeColumn("experiments", "description_medium");
    await queryInterface.removeColumn("experiments", "description_hard");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("experiments", "description_easy", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("experiments", "description_medium", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("experiments", "description_hard", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
