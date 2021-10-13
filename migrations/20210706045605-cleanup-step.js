"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cleanup_steps", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      lesson_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "lessons",
          key: "id",
        },
      },

      text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      image: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("cleanup_steps");
  },
};
