"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const toolModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "tool" } },
      ["id"]
    );

    await queryInterface.bulkInsert("categories", [
      {
        title: "catagory 1",
        module_id: toolModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "catagory 2",
        module_id: toolModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "catagory 3",
        module_id: toolModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "catagory 4",
        module_id: toolModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "catagory 5",
        module_id: toolModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const toolModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "tool" } },
      ["id"]
    );
    await queryInterface.bulkDelete("categories", {module_id : toolModuleId}, {});
  },
};
