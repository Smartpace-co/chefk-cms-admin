"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("safety_levels", [
      {
        title: "Safe unsupervised",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Mostly safe with some supervision",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Safe only with supervision",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Adult only",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("safety_levels", null, {});
  },
};
