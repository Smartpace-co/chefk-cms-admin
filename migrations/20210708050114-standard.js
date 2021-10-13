"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("standards", "uuid", {
      type: Sequelize.STRING(45),
      allowNull: true,
      unique: true,
      after: "description",
    });
    await queryInterface.addColumn("standards", "reference_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "uuid",
      references: {
        model: "standards",
        key: "id",
      },
    });
    await queryInterface.addColumn("standards", "system_language_id", {
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
    await queryInterface.removeColumn("standards", "uuid");
    await queryInterface.removeColumn("standards", "reference_id");
    await queryInterface.removeColumn("standards", "system_language_id");
  },
};
