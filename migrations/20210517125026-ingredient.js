"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("ingredients", "tag_id");
    await queryInterface.removeColumn("ingredients", "allergen_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("ingredients", "tag_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "type_id",
      references: {
        model: "tags",
        key: "id",
      },
    });

    await queryInterface.addColumn("ingredients", "allergen_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: "tag_id",
      references: {
        model: "allergens",
        key: "id",
      },
    });
  },
};
