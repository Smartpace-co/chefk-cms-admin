"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("subscription_packages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      title: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
      },

      package_for: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
      },

      validity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      max_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      grace_period: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      is_private: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("subscription_packages");
  },
};
