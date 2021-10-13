"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("unit_of_measurements", "uuid", {
      type: Sequelize.STRING(45),
      allowNull: true,
      unique: true,
      after: "description",
    });
    await queryInterface.addColumn("unit_of_measurements", "reference_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "uuid",
      references: {
        model: "unit_of_measurements",
        key: "id",
      },
    });
    await queryInterface.addColumn("unit_of_measurements", "system_language_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "reference_id",
      references: {
        model: "system_languages",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("unit_of_measurements", "uuid");
    await queryInterface.removeColumn("unit_of_measurements", "reference_id");
    await queryInterface.removeColumn("unit_of_measurements", "system_language_id");
  },
};
