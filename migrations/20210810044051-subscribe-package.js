"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("subscribe_packages", "subscription_id", {
      type: Sequelize.STRING(90),
      allowNull: true,
      after: "package_id",
    });
    await queryInterface.addColumn("subscribe_packages", "session_id", {
      type: Sequelize.STRING(90),
      allowNull: true,
      after: "subscription_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("subscribe_packages", "subscription_id");
    await queryInterface.removeColumn("subscribe_packages", "session_id");
  },
};
