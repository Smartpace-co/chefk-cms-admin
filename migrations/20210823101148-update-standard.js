"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("standards", "title", { type: Sequelize.STRING(200) });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("standards", "title", { type: Sequelize.STRING(45) });
  },
};
