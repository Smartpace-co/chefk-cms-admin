"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("ingredients", "spotlight_video", {
      type: Sequelize.TEXT,
      after: "allergen_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("ingredients", "spotlight_video");
  },
};
