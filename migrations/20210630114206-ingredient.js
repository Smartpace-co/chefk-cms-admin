"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("ingredients", "language_id");
    await queryInterface.addColumn("ingredients", "season_from", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "spotlight_video",
    });
    await queryInterface.addColumn("ingredients", "season_to", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "season_from",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("ingredients", "language_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "languages",
        key: "id",
      },
    });
    await queryInterface.removeColumn("ingredients", "season_from");
    await queryInterface.removeColumn("ingredients", "season_to");
  },
};
