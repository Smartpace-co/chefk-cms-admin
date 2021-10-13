"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addConstraint("users", {
    //   fields: ["role_id"],
    //   type: "foreign key",
    //   name: "user_fk",
    //   references: {
    //     table: "roles",
    //     field: "id",
    //   },
    // });
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeConstraint("users", "user_fk");
  },
};
