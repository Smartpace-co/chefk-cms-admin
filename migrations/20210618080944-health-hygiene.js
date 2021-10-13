'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.createTable("health_hygienes",{

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      question: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true,
        
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
          field: "created_by",
        },
      },

      updated_by: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
          field: "updated_by",
        },
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

    await queryInterface.dropTable("health_hygienes")
    
  }
}
