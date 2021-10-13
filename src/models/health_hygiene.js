"use strict";
module.exports = (sequelize, DataTypes) => {
  const healthHygiene = sequelize.define(
    "health_hygienes",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      question: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
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

        },
        field: "created_by",
      },

      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",

        },
        field: "updated_by",
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
  );
  healthHygiene.associate = function (models) {



  };

  return healthHygiene;
};
