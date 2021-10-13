'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("countries","country_track",{
      type: Sequelize.TEXT,
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.removeColumn("countries","country_track");
  }
};
