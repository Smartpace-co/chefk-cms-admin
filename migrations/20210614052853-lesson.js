"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("lessons", "meal_type_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "type_id",
      references: {
        model: "meal_types",
        key: "id",
      },
    });
    await queryInterface.addColumn("lessons", "diet_and_health_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "meal_type_id",
      references: {
        model: "diet_and_health",
        key: "id",
      },
    });
    await queryInterface.addColumn("lessons", "language_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "diet_and_health_id",
      references: {
        model: "languages",
        key: "id",
      },
    });
    await queryInterface.addColumn("lessons", "is_featured", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: "language_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("lessons", "meal_type_id");
    await queryInterface.removeColumn("lessons", "diet_and_health_id");
    await queryInterface.removeColumn("lessons", "language_id");
    await queryInterface.removeColumn("lessons", "is_featured");
  },
};
