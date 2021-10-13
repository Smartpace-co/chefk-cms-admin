"use strict";
module.exports = (sequelize, DataTypes) => {
  const unitOfMeasurement = sequelize.define(
    "unit_of_measurements",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      unitOfMeasure: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        field: "title",
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      uuid: {
        type: DataTypes.STRING(45),
        allowNull: true,
        unique: true,
      },

      referenceId: {
        type: DataTypes.INTEGER,
        field: "reference_id",
        allowNull: true,
        references: {
          model: "unit_of_measurements",
          key: "id",
        },
      },

      systemLanguageId: {
        type: DataTypes.INTEGER,
        field: "system_language_id",
        allowNull: true,
        references: {
          model: "system_languages",
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
  unitOfMeasurement.associate = function (models) {
    // association goes here
    // unitOfMeasurement.hasMany(models.standards, { foreignKey: "subject_id" });
  };

  return unitOfMeasurement;
};
