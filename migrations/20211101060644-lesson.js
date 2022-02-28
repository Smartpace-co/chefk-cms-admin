'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.addColumn("lessons","is_deleted",{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: "status",
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("lessons","is_deleted")
  }
};
