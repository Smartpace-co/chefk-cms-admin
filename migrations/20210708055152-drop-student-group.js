'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('student_groups');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('student_groups');
  }
};

