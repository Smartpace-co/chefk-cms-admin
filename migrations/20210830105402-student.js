"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("students", "is_subscription_pause", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: "token",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "students",
      "is_subscription_pause"
    );
  },
};
