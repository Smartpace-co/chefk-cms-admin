"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("schools", "status");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("schools", "status", {
      type: Sequelize.BOOLEAN,
        defaultValue: true,
    });
  },
};
