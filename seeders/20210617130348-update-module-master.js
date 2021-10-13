'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("module_master", [
      {
        module_key: "conversationSentence",
        description: "Manage Conversation Sentences",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        module_key: "imageDragDrop",
        description: "Manage Image Drag Drop Game Content",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        module_key: "imageFlipContent",
        description: "Manage Image Flip Content",
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("module_master", null, {});

  }
};
