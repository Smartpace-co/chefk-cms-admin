"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("ingredients", "easy_ordering", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn("ingredients", "size", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("ingredients", "scientific_name", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn("ingredients", "common_name", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn("ingredients", "spotlight_video", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.removeColumn("ingredients", "season_from");
    await queryInterface.removeColumn("ingredients", "season_to");
    await queryInterface.addColumn("ingredients", "season_id", {
      type: Sequelize.INTEGER,
      after: "spotlight_video",
      allowNull: true,
      references: {
        model: "seasons",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("ingredients", "season_from", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("ingredients", "season_to", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.removeColumn("ingredients", "season_id");
  },
};
