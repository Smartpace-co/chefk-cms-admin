"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("meal_types", [
      {
        title: "Breakfast",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Lunch",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Snacks",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Dinner",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("meal_types", null, {});
  },
};
