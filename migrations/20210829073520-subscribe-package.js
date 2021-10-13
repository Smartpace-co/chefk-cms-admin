"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("subscribe_packages", "subscription_id");
    await queryInterface.addColumn("subscribe_packages", "payment_intent_id", {
      type: Sequelize.STRING(90),
      allowNull: true,
      after: "session_id",
    });
    await queryInterface.addColumn(
      "subscribe_packages",
      "subscription_start_date",
      {
        type: Sequelize.DATEONLY,
        allowNull: true,
        after: "payment_intent_id",
      }
    );
    await queryInterface.addColumn(
      "subscribe_packages",
      "subscription_end_date",
      {
        type: Sequelize.DATEONLY,
        allowNull: true,
        after: "subscription_start_date",
      }
    );
    await queryInterface.addColumn(
      "subscribe_packages",
      "grace_period_start_date",
      {
        type: Sequelize.DATEONLY,
        allowNull: true,
        after: "subscription_end_date",
      }
    );
    await queryInterface.addColumn(
      "subscribe_packages",
      "grace_period_end_date",
      {
        type: Sequelize.DATEONLY,
        allowNull: true,
        after: "grace_period_start_date",
      }
    );
    await queryInterface.addColumn(
      "subscribe_packages",
      "subscription_renewal_date",
      {
        type: Sequelize.DATEONLY,
        allowNull: true,
        after: "grace_period_end_date",
      }
    );
    await queryInterface.addColumn("subscribe_packages", "is_payment_paid", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      after: "subscription_renewal_date",
    });
    // await queryInterface.addColumn("subscribe_packages", "is_owner", {
    //   type: Sequelize.BOOLEAN,
    //   defaultValue: false,
    //   after: "is_payment_paid",
    // });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "subscribe_packages",
      "payment_intent_id"
    );
    await queryInterface.removeColumn(
      "subscribe_packages",
      "subscription_start_date"
    );
    await queryInterface.removeColumn(
      "subscribe_packages",
      "subscription_end_date"
    );
    await queryInterface.removeColumn(
      "subscribe_packages",
      "grace_period_start_date"
    );
    await queryInterface.removeColumn(
      "subscribe_packages",
      "grace_period_end_date"
    );
    await queryInterface.removeColumn(
      "subscribe_packages",
      "subscription_renewal_date"
    );
    await queryInterface.removeColumn("subscribe_packages", "is_payment_paid");
    // await queryInterface.removeColumn("subscribe_packages", "is_owner");
  },
};
