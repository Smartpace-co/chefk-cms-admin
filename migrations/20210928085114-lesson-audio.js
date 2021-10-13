"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "lessons",
      "learning_objectives_for_teacher_track",
      {
        type: Sequelize.TEXT,
        after: "assessment_time",
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      "lessons",
      "learning_objectives_for_student_track",
      {
        type: Sequelize.TEXT,
        after: "learning_objectives_for_teacher_track",
        allowNull: true,
      }
    );
    await queryInterface.addColumn("lessons", "safety_steps_track", {
      type: Sequelize.TEXT,
      after: "learning_objectives_for_student_track",
      allowNull: true,
    });
    await queryInterface.addColumn("lessons", "cleanup_steps_track", {
      type: Sequelize.TEXT,
      after: "safety_steps_track",
      allowNull: true,
    });
    await queryInterface.addColumn("recipes", "preparation_steps_track", {
      type: Sequelize.TEXT,
      after: "image",
      allowNull: true,
    });
    await queryInterface.addColumn("recipes", "cooking_steps_track", {
      type: Sequelize.TEXT,
      after: "preparation_steps_track",
      allowNull: true,
    });
    await queryInterface.addColumn("recipes", "serving_steps_track", {
      type: Sequelize.TEXT,
      after: "cooking_steps_track",
      allowNull: true,
    });
    await queryInterface.addColumn("questions", "question_track", {
      type: Sequelize.TEXT,
      after: "estimated_time",
      allowNull: true,
    });
    await queryInterface.addColumn("experiments", "experiment_steps_track", {
      type: Sequelize.TEXT,
      after: "estimated_make_time",
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "lessons",
      "learning_objectives_for_teacher_track"
    );
    await queryInterface.removeColumn(
      "lessons",
      "learning_objectives_for_student_track"
    );
    await queryInterface.removeColumn("lessons", "safety_steps_track");
    await queryInterface.removeColumn("lessons", "cleanup_steps_track");
    await queryInterface.removeColumn("recipes", "preparation_steps_track");
    await queryInterface.removeColumn("recipes", "cooking_steps_track");
    await queryInterface.removeColumn("recipes", "serving_steps_track");
    await queryInterface.removeColumn("questions", "question_track");
    await queryInterface.removeColumn("experiments", "experiment_steps_track");
  },
};
