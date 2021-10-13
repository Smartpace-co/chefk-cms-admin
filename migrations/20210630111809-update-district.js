'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("district_admins", "deleted_by", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",

      },
      field:"deleted_by"

    });
    await queryInterface.addColumn("district_admins", "deleted_at", {
      type: Sequelize.DATE,
      field:"deleted_at"

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("district_admins", "deleted_by");
    await queryInterface.removeColumn("district_admins", "deleted_at");

  }
};
