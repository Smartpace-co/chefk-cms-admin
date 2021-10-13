"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("serving_steps", "description_easy");
    await queryInterface.removeColumn("serving_steps", "description_medium");
    await queryInterface.removeColumn("serving_steps", "description_hard");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("serving_steps", "description_easy", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("serving_steps", "description_medium", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("serving_steps", "description_hard", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
