"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const culinaryTechniquesModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "culinaryTechniques" } },
      ["id"]
    );

    await queryInterface.bulkInsert("tags", [
      {
        title: "tag 1",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "tag 2",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "tag 3",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "tag 4",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "tag 5",
        module_id: culinaryTechniquesModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const culinaryTechniquesModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "culinaryTechniques" } },
      ["id"]
    );
    await queryInterface.bulkDelete("tags", {module_id : culinaryTechniquesModuleId}, {});
  },
};
