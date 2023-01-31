'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('clever_class_map', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      clever_id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      class_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "classes",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: "updated_at",
      },
    })
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("clever_class_map");
  }
};
