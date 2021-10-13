"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("subjects", "uuid", {
      type: Sequelize.STRING(45),
      allowNull: true,
      unique: true,
      after: "description",
    });
    await queryInterface.addColumn("subjects", "reference_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "uuid",
      references: {
        model: "subjects",
        key: "id",
      },
    });
    await queryInterface.addColumn("subjects", "system_language_id", {
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
    await queryInterface.removeColumn("subjects", "uuid");
    await queryInterface.removeColumn("subjects", "reference_id");
    await queryInterface.removeColumn("subjects", "system_language_id");
  },
};
