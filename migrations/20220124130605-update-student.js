"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("students", "contact_type");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("students", "contact_type", {
      type: Sequelize.ENUM("parent", "guardian"),
      after: "ethnicity_id",
    });
  },
};
