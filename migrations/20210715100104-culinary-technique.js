"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("culinary_techniques", "uuid", {
      type: Sequelize.STRING(45),
      allowNull: true,
      unique: true,
      after: "spotlight_video",
    });
    await queryInterface.addColumn("culinary_techniques", "reference_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "uuid",
      references: {
        model: "culinary_techniques",
        key: "id",
      },
    });
    await queryInterface.addColumn("culinary_techniques", "system_language_id", {
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
    await queryInterface.removeColumn("culinary_techniques", "uuid");
    await queryInterface.removeColumn("culinary_techniques", "reference_id");
    await queryInterface.removeColumn("culinary_techniques", "system_language_id");
  },
};
