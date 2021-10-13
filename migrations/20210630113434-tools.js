"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tools", "type_id");
    await queryInterface.removeColumn("tools", "uses_id");
    await queryInterface.removeColumn("tools", "origin_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tools", "type_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "types",
        key: "id",
      },
    });
    await queryInterface.addColumn("tools", "uses_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "uses",
        key: "id",
      },
    });
    await queryInterface.addColumn("tools", "origin_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "origins",
        key: "id",
      },
    });
  },
};
