"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("culinary_techniques", "easy_ordering");
    await queryInterface.removeColumn("culinary_techniques", "category_id");
    await queryInterface.removeColumn("culinary_techniques", "tag_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("culinary_techniques", "easy_ordering", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "title",
    });
    await queryInterface.addColumn("culinary_techniques", "category_id", {
      type: Sequelize.INTEGER,
      after: "easy_ordering",
      references: {
        model: "categories",
        key: "id",
      },
    });
    await queryInterface.addColumn("culinary_techniques", "tag_id", {
      type: Sequelize.INTEGER,
      after: "category_id",
      references: {
        model: "tags",
        key: "id",
      },
    });
  },
};
