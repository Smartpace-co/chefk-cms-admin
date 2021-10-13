"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const imageDragDropModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "imageDragDrop" } },
      ["id"]
    );
    const imageFlipModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "imageFlipContent" } },
      ["id"]
    );

    await queryInterface.bulkInsert("categories", [
      {
        title: "Kitchen Tools",
        module_id: imageDragDropModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Cooking Techniques ",
        module_id: imageDragDropModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Dishes To Country",
        module_id: imageDragDropModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Fruits",
        module_id: imageFlipModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Vegetables",
        module_id: imageFlipModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Kitchen Tools",
        module_id: imageFlipModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const moduleIds = [];
    moduleIds.push(await queryInterface.rawSelect("module_master", { where: { module_key: "imageDragDrop" } }, ["id"]));
    moduleIds.push(await queryInterface.rawSelect("module_master", { where: { module_key: "imageFlipContent" } }, ["id"]));
    await queryInterface.bulkDelete("categories", { module_id: moduleIds }, {});
  },
};
