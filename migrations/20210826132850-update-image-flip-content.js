"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("image_flip_contents", "category_id", {
      type: Sequelize.INTEGER,
      after: "title",
      references: {
        model: "categories",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("image_flip_contents", "category_id");
  },
};
