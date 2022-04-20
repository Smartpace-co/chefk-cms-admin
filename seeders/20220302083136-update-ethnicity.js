"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("ethnicities", [
      {
        title: "Middle Eastern",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Multicracial or multiethnic",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ethnicities", {title: ["Middle Eastern", "Multicracial or multiethnic"]}, {});
  },
};
