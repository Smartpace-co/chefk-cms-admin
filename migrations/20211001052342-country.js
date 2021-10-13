'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("countries", "background_image", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "system_language_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("countries", "background_image");
  }
};
