"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("lessons", "story_time", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after : "is_featured"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("lessons", "story_time");
  },
};
