"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("countries", "uuid", {
      type: Sequelize.STRING(45),
      allowNull: true,
      unique: true,
      after: "country_name",
    });
    await queryInterface.addColumn("countries", "reference_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "uuid",
      references: {
        model: "countries",
        key: "id",
      },
    });
    await queryInterface.addColumn("countries", "system_language_id", {
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
    await queryInterface.removeColumn("countries", "uuid");
    await queryInterface.removeColumn("countries", "reference_id");
    await queryInterface.removeColumn("countries", "system_language_id");
  },
};
