'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.removeColumn("image_drag_drops","ingredient_id")
   await queryInterface.removeColumn("image_drag_drops","country_id")
   await queryInterface.removeColumn("image_drag_drops","description")
  },

  down: async (queryInterface, Sequelize) => {
  
  }
};
