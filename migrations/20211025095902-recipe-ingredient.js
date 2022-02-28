"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("recipe_ingredients", "is_spotlight", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: "is_optional",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("recipe_ingredients", "is_spotlight");
  },
};
