"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("culinary_techniques", "easy_ordering", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn("culinary_techniques", "tag_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("culinary_techniques", "video", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn("culinary_techniques", "category_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn(
      "culinary_techniques",
      "spotlight_video",
      {
        type: Sequelize.TEXT,
        allowNull: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
