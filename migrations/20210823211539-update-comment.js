'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("comments", "teacher_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "teachers",
        key: "id",

      },
      field:"teacher_id"

    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn("comments","teacher_id")

  }
};
