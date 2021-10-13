"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ingredients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      title: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
      },
      
      easy_ordering: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      
      size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      scientific_name : {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      common_name : {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      language_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "languages",
          key: "id",
        },
      },

      type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "types",
          key: "id",
        },
      },

      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tags",
          key: "id",
        },
      },

      allergen_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "allergens",
          key: "id",
        },
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
    await queryInterface.dropTable("ingredients");
  },
};
