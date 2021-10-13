'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("district_users", "subscribe_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: "subscribe_Id",
      references: {
        model: "subscribe_packages",
        key: "id",
      },
    });
    
    await queryInterface.addColumn("district_users", "customer_id", {
        type: Sequelize.STRING(128),
        allowNull: false,
        field: "customer_id"
 })
},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("district_users", "subscribe_id");
    await queryInterface.removeColumn("district_users", "customer_id");
  }
};
