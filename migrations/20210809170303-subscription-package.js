"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("subscription_packages", "product_id", {
      type: Sequelize.STRING(90),
      allowNull: true,
      after: "description",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("subscription_packages", "product_id");
  },
};
