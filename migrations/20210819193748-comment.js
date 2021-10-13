'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("comments", "comment_image", {
      type: Sequelize.TEXT,
      allowNull: true

    });
    await queryInterface.addColumn("comments", "district_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "district_admins",
        key: "id",

      },
      field:"district_id"

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("comments","comment_image")
     await queryInterface.removeColumn("comments","district_id")

  }
};
