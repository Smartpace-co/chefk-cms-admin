'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
          await queryInterface.createTable("conversation_sentences",{

            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER,
          },

          conversationSentence: {
              type: Sequelize.STRING(200),
              allowNull: false,
              unique: true,
              field: "conversation_sentence",
          },

          categoryId: {
              type: Sequelize.INTEGER,
              allowNull: false,
              field: "category_id",
              references: {
                  model: "categories",
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
              field: "created_by"

          },

          updatedBy: {
              type: Sequelize.INTEGER,
              references: {
                  model: "users",
                  key: "id",
                  
              },
              field: "updated_by"
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
    
        await queryInterface.dropTable("conversation_sentences")


  }
};
