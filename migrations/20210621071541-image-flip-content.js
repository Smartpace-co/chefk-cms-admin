'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable("image_flip_contents",{
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING(30),
      allowNull: false,
      unique:true
    },
    description: {
      type: Sequelize.STRING(200),
      allowNull: false,
      
    },
    type: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
    await queryInterface.dropTable("image_flip_contents")
  }
};
