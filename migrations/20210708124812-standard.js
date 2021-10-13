"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("standards", "image", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "description",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("standards", "image");
  },
};
