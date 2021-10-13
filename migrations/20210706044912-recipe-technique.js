"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("recipe_techniques", "estimated_time", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "animation_link",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("recipe_techniques", "estimated_time");
  },
};
