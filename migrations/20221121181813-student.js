'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'students',
      'clever_id',
      {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      }
    )  
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('students', 'clever_id'); 
  }
};
