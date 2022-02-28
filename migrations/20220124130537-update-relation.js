"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("relations", "type");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("relations", "type", {
      type: Sequelize.ENUM(["parent", "guardian"]),
      allowNull: false,
      after: "description",
    });
  },
};
