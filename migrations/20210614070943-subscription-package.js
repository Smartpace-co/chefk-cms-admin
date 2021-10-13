"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("subscription_packages", "validity");

    await queryInterface.addColumn("subscription_packages", "validity_from", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "is_private",
    });
    await queryInterface.addColumn("subscription_packages", "validity_to", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "validity_from",
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("subscription_packages", "validity_from");
    await queryInterface.removeColumn("subscription_packages", "validity_to");
    await queryInterface.addColumn("subscription_packages", "validity", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "is_private",
    });
  },
};
