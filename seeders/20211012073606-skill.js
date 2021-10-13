'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const subjects = await queryInterface.sequelize.query("SELECT id,title FROM subjects");

    const CCMathId = subjects[0].find((e) => e.title.toLowerCase() === "cc math").id;
    const NGSSId = subjects[0].find((e) => e.title.toLowerCase() === "ngss").id;
    const ELAId = subjects[0].find((e) => e.title.toLowerCase() === "ela").id;
    const NCSSId = subjects[0].find((e) => e.title.toLowerCase() === "ncss").id;

    await queryInterface.bulkInsert("skills", [
      {
        title: "understanding hundreds,tens,and ones",
        subject_id: CCMathId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "plants and animals",
        subject_id: NGSSId,
        status: true,
        created_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("skills", null, {});

  }
};
