"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("recipe_techniques", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      recipe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "recipes",
          key: "id",
        },
      },

      culinary_technique_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "culinary_techniques",
          key: "id",
        },
      },

      dialogue: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      animation_link: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("recipe_techniques");
  },
};
