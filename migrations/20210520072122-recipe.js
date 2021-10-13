"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("recipes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      title: {
        type: Sequelize.STRING(45),
        allowNull: false,
        // unique: true,
      },

      holiday: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      alternative_names: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      estimated_make_time: {
        type: Sequelize.INTEGER,
        allowNull: true
      },

      serves: {
        type: Sequelize.INTEGER,
        allowNull: true
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

      country_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "countries",
          key: "id",
        },
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
    await queryInterface.dropTable("recipes");
  },
};
