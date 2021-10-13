"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      question: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      module_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "module_master",
          key: "id",
        },
      },

      transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: "module_master",
        //   key: "id",
        // },
      },

      question_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "question_types",
          key: "id",
        },
      },

      answer_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "answer_types",
          key: "id",
        },
      },

      hint: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      image: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("questions");
  },
};
