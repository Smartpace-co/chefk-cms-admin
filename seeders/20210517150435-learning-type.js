'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("learning_types", [
      {
        learning: "Sous chef",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Culinary explorer",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Citizen scientist",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Master chef",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Agent of change",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "World adventurer",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Global Genius",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Budding geographer",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Mathlete",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Social scientist",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Expert scientist",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Key investigator",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Master gamer",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Team player",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Heart of gold",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        learning: "Quick learner",
        status: "Active",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

          ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("learning_types", null, {});

  }
};
