"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("teachers", "subscribe_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "subscribe_packages",
        key: "id",
      },
    });
    await queryInterface.addColumn("teachers", "customer_id", {
      type: Sequelize.STRING(128),
      allowNull: true,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("teachers", "subscribe_id");
    await queryInterface.removeColumn("teachers", "customer_id");
  },
};

