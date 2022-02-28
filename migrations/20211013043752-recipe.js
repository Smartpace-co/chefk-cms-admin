"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("recipes", "is_chef_in_house", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: "serving_steps_track",
    });
    await queryInterface.addColumn("recipes", "is_chef_ambassador", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: "is_chef_in_house",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("recipes", "is_chef_in_house");
    await queryInterface.removeColumn("recipes", "is_chef_ambassador");
  },
};
