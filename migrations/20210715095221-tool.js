"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tools", "uuid", {
      type: Sequelize.STRING(45),
      allowNull: true,
      unique: true,
      after: "description",
    });
    await queryInterface.addColumn("tools", "reference_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "uuid",
      references: {
        model: "tools",
        key: "id",
      },
    });
    await queryInterface.addColumn("tools", "system_language_id", {
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
    await queryInterface.removeColumn("tools", "uuid");
    await queryInterface.removeColumn("tools", "reference_id");
    await queryInterface.removeColumn("tools", "system_language_id");
  },
};
