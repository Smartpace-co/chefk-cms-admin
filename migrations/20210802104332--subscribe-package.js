"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("subscription_packages", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "shareable_link",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "subscription_packages",
      "custom_district_name"
    );
  },
};
