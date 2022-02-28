"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("recipes", "estimated_time_for_cooking", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "is_chef_ambassador",
    });
    await queryInterface.addColumn(
      "recipes",
      "estimated_time_for_preparation",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        after: "estimated_time_for_cooking",
      }
    );
    await queryInterface.removeColumn("cooking_steps", "estimated_time");
    await queryInterface.removeColumn("preparation_steps", "estimated_time");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("recipes", "estimated_time_for_cooking");
    await queryInterface.removeColumn("recipes", "estimated_time_for_preparation");
    await queryInterface.addColumn("cooking_steps", "estimated_time", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("preparation_steps", "estimated_time", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
