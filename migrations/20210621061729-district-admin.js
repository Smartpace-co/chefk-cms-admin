"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("district_admins", "subscribe_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "subscribe_packages",
        key: "id",
      },
    });
    await queryInterface.addColumn("district_admins", "customer_id", {
      type: Sequelize.STRING(128),
      allowNull: true,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("district_admins", "subscribe_id");
    await queryInterface.removeColumn("district_admins", "customer_id");
  },
};
