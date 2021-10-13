  "use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("activities", "link");
    await queryInterface.removeColumn("activities", "description_easy");
    await queryInterface.removeColumn("activities", "description_medium");
    await queryInterface.removeColumn("activities", "description_hard");
    await queryInterface.addColumn("activities", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "title",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("activities", "description");
    await queryInterface.addColumn("activities", "link", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("activities", "description_easy", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("activities", "description_medium", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("activities", "description_hard", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
