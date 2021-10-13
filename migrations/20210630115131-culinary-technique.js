"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("culinary_techniques", "uses_id");
    await queryInterface.removeColumn("culinary_techniques", "language_id");
    await queryInterface.removeColumn("culinary_techniques", "safety_level_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("culinary_techniques", "uses_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "uses",
        key: "id",
      },
    });
    await queryInterface.addColumn("culinary_techniques", "language_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "languages",
        key: "id",
      },
    });
    await queryInterface.addColumn("culinary_techniques", "safety_level_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "safety_levels",
        key: "id",
      },
    });
  },
};
