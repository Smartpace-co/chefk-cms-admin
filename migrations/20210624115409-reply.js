'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable("replies",{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      commentId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:"comments",
          key:"id"
        },
        field:"comment_id"
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull:false,
         references: {
          model: "users",
          key: "id",

        },
        field: "user_id",
      },
      reply: {
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
      deletedAt:{
        type: Sequelize.DATE,
        field: "deleted_at",
        allowNull: true

      },
      createdBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",

        },
        field: "created_by",
      },
      deletedAt:{
        allowNull: false,
        type: Sequelize.DATE,
        field: "deleted_at",
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
    await queryInterface.dropTable("replies")
  }
};
