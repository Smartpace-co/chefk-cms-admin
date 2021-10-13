"use strict";
module.exports = (sequelize, DataTypes) => {
  const subscriptionPackageLesson = sequelize.define(
    "subscription_package_lessons",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      packageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "package_id",
        references: {
          model: "subscription_packages",
          key: "id",
        },
      },

      lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "lesson_id",
        references: {
          model: "lessons",
          key: "id",
        },
      },

      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
          field: "created_by",
        },
      },

      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
          field: "updated_by",
        },
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
      },

      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    }
  );
  subscriptionPackageLesson.associate = function (models) {
    subscriptionPackageLesson.belongsTo(models.subscription_packages, {
      foreignKey: "packageId",
    });
    subscriptionPackageLesson.belongsTo(models.lessons, {
      foreignKey: "lessonId",
    });
  };

  return subscriptionPackageLesson;
};
