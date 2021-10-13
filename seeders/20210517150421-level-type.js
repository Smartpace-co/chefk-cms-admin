'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("level_types", [
      {
        level: "Wanderer",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        level: "Inquirer",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        level: "Discoverer",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        level: "Problem Solver",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        level: "Adventure Seeker",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        level: "Ambitious Explorer",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        level: "Taste Maker",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        level: "Geographer", 
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        level: "Experienced Adventurer",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        level: "World Traveler",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }
          ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("level_types", null, {});

  }
};
