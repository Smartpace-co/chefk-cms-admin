"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tools", "image");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tools", "image", Sequelize.TEXT);
  },
};
