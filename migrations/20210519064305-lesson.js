"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("lessons", {
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

      creator_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },

      learning_objectives_for_teacher: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      learning_objectives_for_student: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      greeting: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      linguistic: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      multi_sensory_activity: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      clean_up_step: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      fun_fact: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      social_studies_fact: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      safety_level_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "safety_levels",
          key: "id",
        },
      },

      grade_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "grades",
          key: "id",
        },
      },

      subject_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "subjects",
          key: "id",
        },
      },

      type_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "types",
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
    await queryInterface.dropTable("lessons");
  },
};
