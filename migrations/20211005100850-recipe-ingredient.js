"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("recipe_ingredients", "is_optional", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: "quick_blurb_image",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("recipe_ingredients", "is_optional");
  },
};
