'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('subscribe_packages', 'entity_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "entity_id",
      references: {
        model: "users",
        key: "id",
      },
    }),
    await queryInterface.addColumn("subscribe_packages","is_active", {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      
    
  })

  },
  

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("subscribe_packages","is_active");
  }
};
