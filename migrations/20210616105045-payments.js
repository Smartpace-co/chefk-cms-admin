"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("payments", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      subscribe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "subscribe_packages",
          key: "id",
        },
      },

      is_payment_paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      session_id: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
      },

      payment_intent_id: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable("payments");
  },
};
