"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("difficulty_levels", [
      {
        title: "difficulty 1",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "difficulty 2",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "difficulty 3",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "difficulty 4",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "difficulty 5",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("difficulty_levels", null, {});
  },
};
