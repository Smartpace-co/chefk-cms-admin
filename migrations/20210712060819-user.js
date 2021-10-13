"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "is_admin", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
      after: "token",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "is_admin");
  },
};
