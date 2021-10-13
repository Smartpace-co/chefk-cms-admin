"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("stamps", "uuid", {
      type: Sequelize.STRING(45),
      allowNull: true,
      unique: true,
      after: "learning_type_id",
    });
    await queryInterface.addColumn("stamps", "reference_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "uuid",
      references: {
        model: "stamps",
        key: "id",
      },
    });
    await queryInterface.addColumn("stamps", "system_language_id", {
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
    await queryInterface.removeColumn("stamps", "uuid");
    await queryInterface.removeColumn("stamps", "reference_id");
    await queryInterface.removeColumn("stamps", "system_language_id");
  },
};
