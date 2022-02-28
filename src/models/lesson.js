"use strict";
module.exports = (sequelize, DataTypes) => {
  const lesson = sequelize.define(
    "lessons",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      lessonTitle: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        field: "title",
      },

      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "creator_id",
        references: {
          model: "users",
          key: "id",
        },
      },

      learningObjectivesForTeacher: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "learning_objectives_for_teacher",
      },

      learningObjectivesForStudent: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "learning_objectives_for_student",
      },

      greeting: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      linguistic: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // multiSensoryActivity: {
      //   type: DataTypes.TEXT,
      //   allowNull: true,
      //   field: "multi_sensory_activity",
      // },

      // cleanUpStep: {
      //   type: DataTypes.TEXT,
      //   allowNull: true,
      //   field: "clean_up_step",
      // },

      funFact: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "fun_fact",
      },

      socialStudiesFact: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "social_studies_fact",
      },

      // safetyLevelId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   field: "safety_level_id",
      //   references: {
      //     model: "safety_levels",
      //     key: "id",
      //   },
      // },

      gradeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "grade_id",
        references: {
          model: "grades",
          key: "id",
        },
      },

      // subjectId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   field: "subject_id",
      //   references: {
      //     model: "subjects",
      //     key: "id",
      //   },
      // },

      // typeId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   field: "type_id",
      //   references: {
      //     model: "types",
      //     key: "id",
      //   },
      // },

      // mealTypeId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   field: "meal_type_id",
      //   references: {
      //     model: "meal_types",
      //     key: "id",
      //   },
      // },

      // dietAndHealthId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   field: "diet_and_health_id",
      //   references: {
      //     model: "diet_and_health",
      //     key: "id",
      //   },
      // },

      languageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "language_id",
        references: {
          model: "users",
          key: "id",
        },
      },

      isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_featured",
      },

      storyTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "story_time",
      },

      assessmentTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "assessment_time",
      },

      lessonTime: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: "lesson_time",
      },

      goodbye: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      goodbyeLinguistic: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "goodbye_linguistic",
      },

      greetingTrack: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "greeting_track",
      },

      goodbyeTrack: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "goodbye_track",
      },

      learningObjectivesForTeacherTrack: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "learning_objectives_for_teacher_track",
      },

      learningObjectivesForStudentTrack: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "learning_objectives_for_student_track",
      },

      safetyStepsTrack: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "safety_steps_track",
      },

      cleanupStepsTrack: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "cleanup_steps_track",
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
          model: "lessons",
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

      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_deleted",
      },

      isPermanentDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_permanent_deleted",
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
  lesson.associate = function (models) {
    // lesson.belongsTo(models.safety_levels, {
    //   foreignKey: "safetyLevelId",
    //   as: "safetyLevel",
    // });
    // lesson.belongsTo(models.types, {
    //   foreignKey: "typeId",
    // });
    lesson.belongsTo(models.grades, {
      foreignKey: "gradeId",
    });
    // lesson.belongsTo(models.subjects, {
    //   foreignKey: "subjectId",
    // });
    lesson.belongsTo(models.users, {
      foreignKey: "creatorId",
    });
    lesson.hasMany(models.safety_steps, {
      foreignKey: "lessonId",
      as: "safetySteps",
    });
    lesson.hasMany(models.chef_introductions, {
      foreignKey: "lessonId",
      as: "chefIntroductions",
    });
    lesson.hasOne(models.recipes, {
      foreignKey: "lessonId",
    });
    lesson.hasOne(models.experiments, {
      foreignKey: "lessonId",
    });
    lesson.hasOne(models.activities, {
      foreignKey: "lessonId",
    });
    lesson.hasMany(models.lesson_links, {
      foreignKey: "lessonId",
      as: "links",
    });
    lesson.hasMany(models.questions, {
      foreignKey: "transaction_id",
      // as: "elaQuestions",
    });
    // lesson.hasMany(models.questions, {
    //   foreignKey: "transaction_id",
    //   as: "mathQuestions",
    // });
    // lesson.hasMany(models.questions, {
    //   foreignKey: "transaction_id",
    //   as: "ngssQuestions",
    // });
    lesson.hasMany(models.questions, {
      foreignKey: "transaction_id",
      as: "multiSensoryQuestions",
    });
    // lesson.belongsTo(models.meal_types, {
    //   foreignKey: "mealTypeId",
    //   as: "mealType",
    // });
    // lesson.belongsTo(models.diet_and_health, {
    //   foreignKey: "dietAndHealthId",
    //   as: "dietAndHealth",
    // });
    lesson.belongsTo(models.languages, {
      foreignKey: "languageId",
    });
    lesson.hasMany(models.cleanup_steps, {
      foreignKey: "lessonId",
      as: "cleanupSteps",
    });
    lesson.hasMany(models.teacher_instructions, {
      foreignKey: "lessonId",
      as: "teacherInstructions",
    });
  };

  return lesson;
};
