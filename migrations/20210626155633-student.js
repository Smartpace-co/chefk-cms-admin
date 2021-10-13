"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("students", "subscribe_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "subscribe_packages",
        key: "id",
      },
    });
    await queryInterface.addColumn("students", "customer_id", {
      type: Sequelize.STRING(128),
      allowNull: true,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("students", "subscribe_id");
    await queryInterface.removeColumn("students", "customer_id");
  },
};
