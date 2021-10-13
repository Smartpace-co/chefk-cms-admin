"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const toolModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "tool" } },
      ["id"]
    );

    await queryInterface.bulkInsert("origins", [
      {
        title: "origin 1",
        module_id: toolModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "origin 2",
        module_id: toolModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "origin 3",
        module_id: toolModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "origin 4",
        module_id: toolModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "origin 5",
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
    await queryInterface.bulkDelete("origins", {module_id : toolModuleId}, {});
  },
};
