'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("students", "custom_district_name", {
      type: Sequelize.STRING(45),
      allowNull: true,
      field: "custom_district_name",
      after: "district_id",
    });
    await queryInterface.addColumn("students", "custom_school_name", {
      type: Sequelize.STRING(45),
      allowNull: true,
      field: "custom_school_name",
      after: "school_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("students", "custom_district_name");
    await queryInterface.removeColumn("students", "custom_school_name");
  }
};
