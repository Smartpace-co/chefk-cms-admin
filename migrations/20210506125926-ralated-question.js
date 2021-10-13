"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("related_questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      question: {
        type: Sequelize.TEXT,
        allowNull: false,
        // unique: true,
      },
      
      transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: "module_master",
        //   key: "id",
        // },
      },

      module_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "module_master",
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
    await queryInterface.dropTable("related_questions");
  },
};
