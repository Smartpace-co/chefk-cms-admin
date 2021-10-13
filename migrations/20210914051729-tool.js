"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("tools", "safety_level_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.removeColumn("tools", "difficulty_level_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tools", "difficulty_level_id", {
      type: Sequelize.INTEGER,
      after: "safety_level_id",
      allowNull: true,
      references: {
        model: "difficulty_levels",
        key: "id",
      },
    });
  },
};
