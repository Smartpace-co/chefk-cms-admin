"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      role_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
      },

      phone_number: {
        type: Sequelize.STRING(45),
        // unique: true,
      },

      password: {
        type: Sequelize.STRING(145),
        allowNull: false,
      },

      token: {
        type: Sequelize.STRING(145),
        allowNull: true,
      },

      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      is_email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      is_phone_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
