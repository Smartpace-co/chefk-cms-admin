"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("module_master", [
      {
        module_key: "tool",
        description: "Manage Tools",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        module_key: "nutrient",
        description: "Manage Nutrient",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        module_key: "ingredients",
        description: "Manage Ingredients",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        module_key: "culinaryTechniques",
        description: "Manage Culinary Techniques",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        module_key: "issuesOrFeedbacks",
        description: "Manage Tssues or Feedbacks ",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("module_master", null, {});
  },
};
