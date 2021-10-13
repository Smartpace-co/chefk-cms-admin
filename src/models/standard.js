"use strict";
module.exports = (sequelize, DataTypes) => {
  const standard = sequelize.define(
    "standards",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      standardTitle: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        field: "title",
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      image: {
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
          model: "subjects",
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

      gradeId: {
        type: DataTypes.INTEGER,
        field: "grade_id",
        allowNull: false,
        references: {
          model: "grades",
          key: "id",
        },
      },

      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "subject_id",
        references: {
          model: "subject",
          key: "id",
        },
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

  standard.associate = function (models) {
    standard.belongsTo(models.subjects, {
      foreignKey: "subjectId",
    });
    standard.hasMany(models.standard_skills, {
      foreignKey: "standardId",
      as:"skills"
    });
    standard.belongsTo(models.grades, {
      foreignKey: "gradeId",
    });
  };

  return standard;
};
