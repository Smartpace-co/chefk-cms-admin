'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('schools', 'deleted_by', {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",

      },
      field:"deleted_by",
      allowNull: true
  })
    await queryInterface.changeColumn("schools", "deleted_at", {
      type: Sequelize.DATE,
      field:"deleted_at",
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};
