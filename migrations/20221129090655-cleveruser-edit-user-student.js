"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('clever_users', {
        id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "users",
            key: "id",
          },
        },
        student_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "students",
            key: "id",
          },
        },
        token: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        redirect_secret: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        is_completed: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DataTypes.DATE,
          field: "created_at",
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DataTypes.DATE,
          field: "updated_at",
        },
      }, {
        transaction,
      })

      // remove columns which they added in previous migration
      await queryInterface.removeColumn('users', 'clever_id', { transaction }); 
      await queryInterface.removeColumn('students', 'clever_id', { transaction }); 

      await queryInterface.addColumn(
        "users",
        "from_clever",
        {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
        },
        {
          transaction,
        }
      );
      
      await queryInterface.addColumn(
        "students",
        "from_clever",
        {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
        },
        {
          transaction,
        }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("clever_users",  { transaction });
      await queryInterface.removeColumn("users", "from_clever", { transaction });
      await queryInterface.removeColumn("students", "from_clever", {
        transaction,
      });

      await queryInterface.addColumn(
        'users',
        'clever_id',
        {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        { transaction }
      ) 
       
      await queryInterface.addColumn(
        'students',
        'clever_id',
        {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        { transaction }
      )

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
