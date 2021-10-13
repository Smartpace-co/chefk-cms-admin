'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("class_groups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      title: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },

      group_color_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "group_colors",
          key: "id",
        },
      },

      class_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "classes",
          key: "id",
        },
      },

      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true
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

      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
