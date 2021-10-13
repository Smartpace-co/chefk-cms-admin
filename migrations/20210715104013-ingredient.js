"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("ingredients", "uuid", {
      type: Sequelize.STRING(45),
      allowNull: true,
      unique: true,
      after: "spotlight_video",
    });
    await queryInterface.addColumn("ingredients", "reference_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "uuid",
      references: {
        model: "ingredients",
        key: "id",
      },
    });
    await queryInterface.addColumn("ingredients", "system_language_id", {
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
    await queryInterface.removeColumn("ingredients", "uuid");
    await queryInterface.removeColumn("ingredients", "reference_id");
    await queryInterface.removeColumn("ingredients", "system_language_id");
  },
};
