"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("schools", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      district_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "district_admins",
          key: "id",
        },
      },

      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },

      school_address: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },

      admin_account_name: {
        type: Sequelize.STRING(45),
        unique: false,
      },
      contact_person_name: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      contact_person_number: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      contact_person_email: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },

      contact_person_address: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },

      emergency_contact_number: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      max_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      package_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        field: "created_by",
        references: {
          model: "users",
          key: "id",
        },
      },

      updatedBy: {
        type: Sequelize.INTEGER,
        field: "updated_by",
        references: {
          model: "users",
          key: "id",
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("schools");
  },
};
