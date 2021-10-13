'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("school_users","subscribe_id")
    await queryInterface.removeColumn("school_users","package_id")
    await queryInterface.addColumn("school_users","parent_id",{
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
    await queryInterface.removeColumn("school_users","parent_id")
  }
};
