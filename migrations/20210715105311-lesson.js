"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("lessons", "uuid", {
      type: Sequelize.STRING(45),
      allowNull: true,
      unique: true,
      after: "story_time",
    });
    await queryInterface.addColumn("lessons", "reference_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "uuid",
      references: {
        model: "lessons",
        key: "id",
      },
    });
    await queryInterface.addColumn("lessons", "system_language_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "reference_id",
      references: {
        model: "system_languages",
        key: "id",
      },
    });
    await queryInterface.removeColumn("lessons", "type_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("lessons", "uuid");
    await queryInterface.removeColumn("lessons", "reference_id");
    await queryInterface.removeColumn("lessons", "system_language_id");
    await queryInterface.addColumn("lessons", "type_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "types",
        key: "id",
      },
    });
  },
};
