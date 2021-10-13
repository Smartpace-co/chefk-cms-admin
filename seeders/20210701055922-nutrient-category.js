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
      "categories",
      { module_id: nutrientModuleId },
      {}
    );

    await queryInterface.bulkInsert("categories", [
      {
        title: "Carbohydrates",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Proteins",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Fats",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Vitamins",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Minerals",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Fiber and water",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Potassium",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Chloride",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Sodium",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Calcium",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Phosphorus",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Magnesium",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Iron",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Zinc",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Manganese",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Copper",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Iodine",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "chromium",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Biotin (vitamin B7)",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Folic acid (folate, vitamin B9)",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Niacin (vitamin B3)",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Pantothenic acid (vitamin B5)",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Riboflavin (vitamin B2)",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Thiamin (vitamin B1)",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        title: "Vitamin B6",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Vitamin B12",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Vitamin C",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Vitamin A",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Vitamin D",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Vitamin E",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Vitamin K",
        module_id: nutrientModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Sulfur",
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
      "categories",
      { module_id: nutrientModuleId },
      {}
    );
    queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  },
};
