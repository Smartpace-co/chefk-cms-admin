"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    const nutrientModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "nutrient" } },
      ["id"]
    );

    await queryInterface.bulkDelete(
      "types",
      { module_id: nutrientModuleId },
      {}
    );

    await queryInterface.bulkInsert("types", [
      {
        title: "Vitamin",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Nutrient",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Carbohydrate",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Oil/Fat",
        module_id: nutrientModuleId,
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
    const nutrientModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "nutrient" } },
      ["id"]
    );
    await queryInterface.bulkDelete(
      "types",
      { module_id: nutrientModuleId },
      {}
    );
    queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  },
};
