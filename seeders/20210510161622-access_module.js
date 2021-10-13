"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("access_modules", [
      {
        title: "Billing",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Profile",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Membership",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }, 
      {
        title: "Schools",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }, 
      {
        title: "Schools Reports",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }, 
      {
        title: "Classes",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Classes Reports",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
     {
        title: "Settings",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Content Reports",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Users",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
        
      {
        title: "Student",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Teachers",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Roles",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Users Reports",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("access_modules", null, {});
  },
};
