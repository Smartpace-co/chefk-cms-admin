"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tools", "category_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tools", "category_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
    });
  },
};
