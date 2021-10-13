"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("district_admins", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      admin_account_name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      district_address: {
        type: Sequelize.STRING(250),
        allowNull: true,
      },
      contact_person_name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      contact_person_no: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      contact_person_email: {
        type: Sequelize.STRING(45),
        defaultValue: false,
      },
      contact_person_gender: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      package_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: "packages",
        //   key: "id",
        // },
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
    await queryInterface.dropTable("district_admins");
  },
};
