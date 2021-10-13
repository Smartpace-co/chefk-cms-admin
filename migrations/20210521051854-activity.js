"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("activities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      title: {
        type: Sequelize.STRING(45),
        // allowNull: false,
        // unique: true,
      },

      image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      link: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      description_easy: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      description_medium: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      description_hard: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      lesson_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "lessons",
          key: "id",
        },
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
    await queryInterface.dropTable("activities");
  },
};
