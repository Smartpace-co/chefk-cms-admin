"use strict";
module.exports = (sequelize, DataTypes) => {
  const standardSkill = sequelize.define(
    "standard_skills",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      standardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "standard_id",
        references: {
          model: "standards",
          key: "id",
        },
      },

      skillId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "skill_id",
        references: {
          model: "skills",
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
  standardSkill.associate = function (models) {
    standardSkill.belongsTo(models.standards, {
      foreignKey: "standardId",
      as: "skills",
    });
    standardSkill.belongsTo(models.skills, {
      foreignKey: "skillId",
    });
  };

  return standardSkill;
};
