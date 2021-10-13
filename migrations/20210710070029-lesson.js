"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("lessons", "diet_and_health_id");
    await queryInterface.removeColumn("lessons", "meal_type_id");
    await queryInterface.removeColumn("lessons", "safety_level_id");
    await queryInterface.removeColumn("lessons", "subject_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("lessons", "diet_and_health_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "diet_and_health",
        key: "id",
      },
    });
    await queryInterface.addColumn("lessons", "meal_type_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "meal_types",
        key: "id",
      },
    });
    await queryInterface.addColumn("lessons", "safety_level_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "safety_levels",
        key: "id",
      },
    });
    await queryInterface.addColumn("lessons", "subject_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "subjects",
        key: "id",
      },
    });
  },
};
