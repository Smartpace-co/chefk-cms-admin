"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("nutrients", "spotlight_video", {
      type: Sequelize.TEXT,
      after: "description",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("nutrients", "spotlight_video");
  },
};
