"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("recipe_ingredients", {
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

      ingredient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ingredients",
          key: "id",
        },
      },

      unit_of_measurement_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "unit_of_measurements",
          key: "id",
        },
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      quick_blurb_text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      quick_blurb_image: {
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
    await queryInterface.dropTable("recipe_ingredients");
  },
};
