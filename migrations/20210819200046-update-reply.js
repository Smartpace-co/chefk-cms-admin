'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("replies", "district_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "district_admins",
        key: "id",

      },
      field:"district_id"

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("replies","district_id")

  }
};
