'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("teachers","custom_district_name",{
      type: Sequelize.STRING(45),
      allowNull: true,
      field:"custom_district_name",
      after: "school_id",
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("teachers","custom_district_name")

  }
};