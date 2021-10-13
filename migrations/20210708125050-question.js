"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("questions", "estimated_make_time");
    await queryInterface.addColumn("questions", "estimated_time", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "description_hard",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("questions", "estimated_time");
    await queryInterface.addColumn("questions", "estimated_make_time", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "description_hard",
    });
  },
};
