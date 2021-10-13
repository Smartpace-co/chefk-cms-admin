'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("classes","parent_id",{
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
    await queryInterface.removeColumn("classes","parent_id")
  }
};
