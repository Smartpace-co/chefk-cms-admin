"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tools", {
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
      
      image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      
      safety_level_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "safety_levels",
          key: "id",
        },
      },

      difficulty_level_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "difficulty_levels",
          key: "id",
        },
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

      origin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "origins",
          key: "id",
        },
      },

      description: {
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
    await queryInterface.dropTable("tools");
  },
};
