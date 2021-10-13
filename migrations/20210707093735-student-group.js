"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("student_groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      group_color_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "group_colors",
          key: "id",
        },
      },

      group_title: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },

      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "students",
          key: "id",
        },
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
    await queryInterface.dropTable("student_groups");
  },
};
