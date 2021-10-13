'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("students","subscribe_id")
    await queryInterface.removeColumn("students","package_id")
    await queryInterface.addColumn("students","parent_id",{
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
    await queryInterface.removeColumn("students","parent_id")

  }
};
