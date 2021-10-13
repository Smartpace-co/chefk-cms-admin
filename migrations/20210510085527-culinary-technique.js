"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("culinary_techniques", {
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
      
      safety_level_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "safety_levels",
          key: "id",
        },
      },

      language_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "languages",
          key: "id",
        },
      },

      easy_ordering: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
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

      uses_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "uses",
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

      kitchen_requirements : {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      video : {
        type: Sequelize.TEXT,
        allowNull: false,
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
    await queryInterface.dropTable("culinary_techniques");
  },
};
