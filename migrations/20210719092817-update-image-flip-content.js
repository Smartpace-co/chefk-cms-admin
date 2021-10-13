'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("image_flip_contents","type")
   await queryInterface.removeColumn("image_flip_contents","description")
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};
