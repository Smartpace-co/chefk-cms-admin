'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("assign_lessons", "deleted_at", {
      type: Sequelize.DATE,
      field:"deleted_at"

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("assign_lessons", "deleted_at");
  }
};
