"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("subscription_packages", "price_id", {
      type: Sequelize.STRING(90),
      allowNull: true,
      after: "product_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("subscription_packages", "price_id");
  },
};
