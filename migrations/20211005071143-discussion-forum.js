"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("discussion_forums", "is_pinned", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: "down_vote",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("discussion_forums", "is_pinned");
  },
};
