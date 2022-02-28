"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("culinary_techniques", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "video",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("culinary_techniques", "description");
  },
};
