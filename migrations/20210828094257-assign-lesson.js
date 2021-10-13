"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("assign_lessons", "archived_at", {
      type: Sequelize.DATE,
      field: "archived_at",
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("assign_lessons", "archived_at");
  },
};
