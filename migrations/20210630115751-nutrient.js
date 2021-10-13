"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("nutrients", "uses_id");
    await queryInterface.removeColumn("nutrients", "origin_id");
    await queryInterface.removeColumn("nutrients", "safety_level_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("nutrients", "uses_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "uses",
        key: "id",
      },
    });
    await queryInterface.addColumn("nutrients", "origin_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "origins",
        key: "id",
      },
    });
    await queryInterface.addColumn("nutrients", "origin_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "safety_levels",
        key: "id",
      },
    });
  },
};
