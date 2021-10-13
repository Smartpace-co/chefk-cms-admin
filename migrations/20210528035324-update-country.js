'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('countries', 'status', {
      type: Sequelize.BOOLEAN,
      defaultValue:true 
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('countries', 'status', {
      type: Sequelize.STRING,
      defaultValue:"" 
    })
  }
};
