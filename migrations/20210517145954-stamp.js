'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("stamps", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      stamp_title: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
      },

      stamp_type: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      country_id:{
        type: Sequelize.TEXT,
        allowNull: true,
      },
      level_type_id:{
        type: Sequelize.TEXT,
        allowNull: true,
      },
      learning_type_id:{
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },

      updated_by: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("stamps");

  }
};
