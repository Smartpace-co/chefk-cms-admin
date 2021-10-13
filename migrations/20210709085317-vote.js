'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("votes",{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      vote: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
       
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
      },

      
      discussionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "discussion_id",
        references: {
          model: "discussion_forums",
          key: "id",
        },
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
    },
   
    )
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable("votes")
  }
};
