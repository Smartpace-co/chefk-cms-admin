"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("subscription_packages", "shareable_link", {
      type: Sequelize.STRING(256),
      allowNull: true,
      after: "validity_to",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "subscription_packages",
      "shareable_link"
    );
  },
};
