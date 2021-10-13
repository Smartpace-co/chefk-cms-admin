"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("lessons", "clean_up_step");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("lessons", "clean_up_step", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },
};
