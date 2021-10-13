'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("schools", "deleted_by", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",

      },
      field:"deleted_by"

    });
    await queryInterface.addColumn("schools", "deleted_at", {
      type: Sequelize.DATE,
      field:"deleted_at"

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("schools", "deleted_by");
    await queryInterface.removeColumn("schools", "deleted_at");

  }
};
