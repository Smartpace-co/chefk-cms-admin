"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("lessons", "multi_sensory_activity");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("lessons", "multi_sensory_activity", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },
};
