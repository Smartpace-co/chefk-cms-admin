"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("nutrients", "uuid", {
      type: Sequelize.STRING(45),
      allowNull: true,
      unique: true,
      after: "spotlight_video",
    });
    await queryInterface.addColumn("nutrients", "reference_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "uuid",
      references: {
        model: "nutrients",
        key: "id",
      },
    });
    await queryInterface.addColumn("nutrients", "system_language_id", {
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
    await queryInterface.removeColumn("nutrients", "uuid");
    await queryInterface.removeColumn("nutrients", "reference_id");
    await queryInterface.removeColumn("nutrients", "system_language_id");
  },
};
