"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("notifications", "notifications_ibfk_3");
    await queryInterface.removeConstraint("notifications", "notifications_ibfk_4");
  },

  down: async (queryInterface, Sequelize) => {},
};
