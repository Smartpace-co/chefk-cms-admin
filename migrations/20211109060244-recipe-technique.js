"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("recipe_techniques", "dialogue");
    await queryInterface.removeColumn("recipe_techniques", "animation_link");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("recipe_techniques", "dialogue", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn("recipe_techniques", "animation_link", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },
};
