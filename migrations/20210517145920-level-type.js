'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("level_types", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      level: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
      },
      status: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("level_types");

  }
};
