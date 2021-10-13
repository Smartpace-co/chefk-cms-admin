'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("district_users","subscribe_id")
    await queryInterface.removeColumn("district_users","package_id")
    await queryInterface.addColumn("district_users","parent_id",{
      type: Sequelize.INTEGER,
      allowNull: true,
      field:"parent_id",
      references: {
        model: "users",
        key: "id",
      },
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("district_users","parent_id")
  }
};
