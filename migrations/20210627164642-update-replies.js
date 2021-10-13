'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("replies", "school_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "schools",
        key: "id",

      },
      field:"school_id"

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("replies", "school_id");

  }
};
