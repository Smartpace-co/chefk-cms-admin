"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("schools", "subscribe_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "subscribe_packages",
        key: "id",
      },
    });
    await queryInterface.addColumn("schools", "customer_id", {
      type: Sequelize.STRING(128),
      allowNull: true,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("schools", "subscribe_id");
    await queryInterface.removeColumn("schools", "customer_id");
  },
};
