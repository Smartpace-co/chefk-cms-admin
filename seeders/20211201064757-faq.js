"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("faqs", [
      {
        question: "How to renew membership plan ?",
        answer: "You can renew membership plan from settings.",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question: "Is auto renew there ?",
        answer: "Yes",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question: "Where I can find agent information ?",
        answer: "You can see agent complete information in profile section",
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("faqs", null, {});
  },
};
