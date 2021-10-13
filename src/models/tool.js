"use strict";
module.exports = (sequelize, DataTypes) => {
  const tool = sequelize.define(
    "tools",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      toolTitle: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        field: "title",
      },

      safetyLevelId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "safety_level_id",
        references: {
          model: "safety_levels",
          key: "id",
        },
      },

      // difficultyLevelId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   field: "difficulty_level_id",
      //   references: {
      //     model: "difficulty_levels",
      //     key: "id",
      //   },
      // },

      // categoryId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   field: "category_id",
      //   references: {
      //     model: "categories",
      //     key: "id",
      //   },
      // },

      // typeId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   field: "type_id",
      //   references: {
      //     model: "types",
      //     key: "id",
      //   },
      // },

      // usesId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   field: "uses_id",
      //   references: {
      //     model: "uses",
      //     key: "id",
      //   },
      // },

      // originId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   field: "origin_id",
      //   references: {
      //     model: "origins",
      //     key: "id",
      //   },
      // },

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
          model: "tools",
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
  tool.associate = function (models) {
    tool.belongsTo(models.safety_levels, {
      foreignKey: "safetyLevelId",
      as: "safetyLevel",
    });
    // tool.belongsTo(models.difficulty_levels, {
    //   foreignKey: "difficultyLevelId",
    //   as: "difficultyLevel",
    // });
    // tool.belongsTo(models.categories, {
    //   foreignKey: "categoryId",
    // });
    // tool.belongsTo(models.types, {
    //   foreignKey: "typeId",
    // });
    // tool.belongsTo(models.origins, {
    //   foreignKey: "originId",
    // });
    // tool.belongsTo(models.uses, {
    //   foreignKey: "usesId",
    // });
    tool.hasMany(models.questions, {
      foreignKey: "transaction_id",
      as: "relatedQuestions",
    });
    tool.hasMany(models.images, {
      foreignKey: "transaction_id",
    });
  };

  return tool;
};
