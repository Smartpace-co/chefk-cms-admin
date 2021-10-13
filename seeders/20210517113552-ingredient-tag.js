"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ingredientsModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "ingredients" } },
      ["id"]
    );

    await queryInterface.bulkInsert("tags", [
      {
        title: "tag 1",
        module_id: ingredientsModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "tag 2",
        module_id: ingredientsModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "tag 3",
        module_id: ingredientsModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "tag 4",
        module_id: ingredientsModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "tag 5",
        module_id: ingredientsModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const ingredientsModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "ingredients" } },
      ["id"]
    );
    await queryInterface.bulkDelete("tags", {module_id : ingredientsModuleId}, {});
  },
};
