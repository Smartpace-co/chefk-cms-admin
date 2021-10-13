"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("roles", "is_master", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
      after: "description",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("roles", "is_master");
  },
};
