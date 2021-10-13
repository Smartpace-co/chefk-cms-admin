"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("answers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "questions",
          key: "id",
        },
      },

      option : {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      is_answer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      image : {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      is_delete: {
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
    await queryInterface.dropTable("answers");
  },
};
