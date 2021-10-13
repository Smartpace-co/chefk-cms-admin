"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    const culinaryTechniquesModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "culinaryTechniques" } },
      ["id"]
    );

    await queryInterface.bulkDelete(
      "categories",
      { module_id: culinaryTechniquesModuleId },
      {}
    );

    await queryInterface.bulkInsert("categories", [
      {
        title: "Boiling",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Pairing",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Knife Skills",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Puree",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Garnish",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        title: "Infusion",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Saute",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Toasting",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Emulsifying",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Simmering",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Stewing",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Reducing",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Julien",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Stir-fy",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Paring",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        title: "Grating",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Braising",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Deep Frying",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Dutch Oven Cooking",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Seasoning",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Grape Leaves",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Beating eggs",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Cabbage Wrap",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    const culinaryTechniquesModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "culinaryTechniques" } },
      ["id"]
    );
    await queryInterface.bulkDelete(
      "categories",
      { module_id: culinaryTechniquesModuleId },
      {}
    );
    queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  },
};
