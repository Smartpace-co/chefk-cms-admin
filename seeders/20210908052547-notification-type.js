"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("notification_types", [
      {
        title: "SYSTEM ALERTS",
        key: "system_alerts",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "BILLING & PAYMENT",
        key: "billing_&_payment",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "NEW ACCOUNT",
        key: "new_account",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "OTHERS",
        key: "others",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "STUDENT ACTIVITY",
        key: "student_activity",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "NEW STUDENT",
        key: "new_student",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "NEW CLASS",
        key: "new_class",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "ASSIGNMENT COMPLETED",
        key: "assignment_completed",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "STUDENT TAKE ACTION ACTIVITY",
        key: "student_take_action_activity",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "STUDENT PERFORMANCE ALERT",
        key: "student_performance_alert",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "NEW ASSIGNMENT",
        key: "new_assignment",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "ADDED TO CLASS",
        key: "added_to_class",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("notification_types", {}, {});
  },
};
