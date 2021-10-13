'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint("subscribe_packages", "subscribe_packages_ibfk_4")
  },

  down: async (queryInterface, Sequelize) => {
  }
};
