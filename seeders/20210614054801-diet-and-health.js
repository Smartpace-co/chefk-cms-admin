"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("diet_and_health", [
      {
        title: "Meat Free",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Dairy Free",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Gluten Free",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Nut Free",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Vegan",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("diet_and_health", null, {});
  },
};
