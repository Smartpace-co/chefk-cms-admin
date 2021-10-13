"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("lessons", "goodbye", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "is_featured",
    });
    await queryInterface.addColumn("lessons", "goodbye_linguistic", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "goodbye",
    });
    await queryInterface.addColumn("lessons", "greeting_track", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "goodbye_linguistic",
    });
    await queryInterface.addColumn("lessons", "goodbye_track", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "greeting_track",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("lessons", "goodbye");
    await queryInterface.removeColumn("lessons", "goodbye_linguistic");
    await queryInterface.removeColumn("lessons", "greeting_track");
    await queryInterface.removeColumn("lessons", "goodbye_track");
  },
};
