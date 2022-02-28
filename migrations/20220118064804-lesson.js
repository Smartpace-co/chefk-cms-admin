'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.addColumn("lessons","is_permanent_deleted",{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: "is_deleted",
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("lessons","is_permanent_deleted")
  }
};
