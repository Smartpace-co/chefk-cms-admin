"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "is_subscription_pause", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: "is_admin",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "users",
      "is_subscription_pause"
    );
  },
};
