'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.addColumn("teachers","custom_school_name",{
      type: Sequelize.STRING(45),
      allowNull: true,
      after: "custom_district_name",
      field:"custom_school_name",
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("teachers","custom_school_name")

  }
};
