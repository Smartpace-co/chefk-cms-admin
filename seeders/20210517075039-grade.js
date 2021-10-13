'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("grades", [
      {
        grade: "1st",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        grade: "2nd",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        grade: "3rd",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        grade: "4th",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        grade: "5th",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("grades", null, {});
  }
};
