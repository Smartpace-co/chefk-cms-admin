"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("ingredients", "type_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("ingredients", "type_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "types",
        key: "id",
      },
    });
  },
};
