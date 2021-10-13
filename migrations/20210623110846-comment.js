'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.createTable("comments",{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      discussionId:{
        type:Sequelize.INTEGER,
        references:{
          model:"discussion_forums",
          key:"id"
        },
        field:"discussion_id"
      },
      userId:{
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",

        },
        field: "user_id",
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      
      },

      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
        field: "deleted_at",
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
    
    await queryInterface.dropTable("comments")
  }
};
