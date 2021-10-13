"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("image_drag_drops", "category_id", {
      type: Sequelize.INTEGER,
      after: "title",
      references: {
        model: "categories",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("image_drag_drops", "category_id");
  },
};
