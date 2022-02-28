"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("schools", "custom_district_name", {
      type: Sequelize.STRING(45),
      allowNull: true,
      field: "custom_district_name",
      after: "district_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("schools", "custom_district_name");
  },
};
