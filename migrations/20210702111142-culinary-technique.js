"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("culinary_techniques", "type_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("culinary_techniques", "type_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "types",
        key: "id",
      },
    });
  },
};
