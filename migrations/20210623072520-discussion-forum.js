'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable("discussion_forums", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",

        },
        field: "user_id",
      },
      topic: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false,

      },

      upVote: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: "up_vote",
        allowNull: true,


      },
      downVote: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: "down_vote",
        allowNull: true,


      },
      deletedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",

        },
        field: "deleted_by",
        allowNull: true

      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: "deleted_at"

      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",

        },
        field: "created_by",
      },

      updatedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",

        },
        field: "updated_by",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
    })


  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable("discussion_forums")


  }
};
