'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("notification_types", [
      {
        title: "NEW LESSON",
        key: "new_lesson_available",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "SHOW CONTACT INFORMATION",
        key: "show_contact_information_to_student",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("notification_types", {}, {});

  }
};
