'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("module_master", [
      {
        module_key: "stamp",
        description: "Manage Stamps",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        module_key: "country",
        description: "Manage countries",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("module_master", null, {});

  }
};
