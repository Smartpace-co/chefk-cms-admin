'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("schools","subscribe_id")
    await queryInterface.removeColumn("schools","package_id")
    await queryInterface.addColumn("schools","parent_id",{
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
    await queryInterface.removeColumn("schools","parent_id")
  }
};
