'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const conversationSentenceModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "conversationSentence" } },
      ["id"]
    );

    await queryInterface.bulkInsert("categories", [
      {
        title: "Lesson Start",
        module_id: conversationSentenceModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Experiment",
        module_id: conversationSentenceModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Lesson Story",
        module_id: conversationSentenceModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Activity",
        module_id: conversationSentenceModuleId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },


  down: async (queryInterface, Sequelize) => {
    const conversationSentenceModuleId = await queryInterface.rawSelect(
      "module_master",
      { where: { module_key: "conversationSentence" } },
      ["id"]
    );
    await queryInterface.bulkDelete("categories", {module_id : conversationSentenceModuleId}, {});
  },
};
