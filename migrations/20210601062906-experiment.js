"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("experiments", "text");
    await queryInterface.removeColumn("experiments", "link");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("experiments", "text", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "description_hard",
    });
    await queryInterface.addColumn("experiments", "link", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "text",
    });
  },
};
