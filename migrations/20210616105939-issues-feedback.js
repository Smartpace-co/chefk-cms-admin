'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable("issues_feedbacks", {


            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },

            reportIssueId: {
                type: Sequelize.INTEGER,
                field: "report_issue_id",
                allowNull: false,
                references: {
                    model: "report_issues",
                    key: "id"
                }
            },

            comment: {
                type: Sequelize.TEXT,
                allowNull: true,

            },
            createdBy: {
                type: Sequelize.INTEGER,
                field: "created_by",

            },
            updatedBy: {
                type: Sequelize.INTEGER,
                field: "updated_by",

            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: "created_at",
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: "updated_at",
            },

        },
            {
                timestamps: true,
                freezeTableName: true,
                underscored: true,
            }
        )

    },

    down: async (queryInterface, Sequelize) => {

        await queryInterface.dropTable("issues_feedbacks")

    }
};
