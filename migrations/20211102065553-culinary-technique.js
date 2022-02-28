"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("culinary_techniques", "spotlight_video");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("culinary_techniques", "spotlight_video", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },
};
