"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("experiments", "title", {
      type: Sequelize.STRING(100),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("experiments", "title", {
      type: Sequelize.STRING(45),
      allowNull: false,
    });
  },
};
