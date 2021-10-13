'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("report_issues", "school_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "schools",
        key: "id",

      },
      field:"school_id"

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("report_issues", "school_id");

  }
};
