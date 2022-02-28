"use strict";
module.exports = (sequelize, DataTypes) => {
  const school = sequelize.define(
    "schools",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
      },

      districtId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "district_id",
        references: {
          model: "district_admins",
          key: "id",
        },
      },

      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },

      displayName: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: "display_name",
      },

      adminAccountName: {
        type: DataTypes.STRING(45),
        unique: false,
        field: "admin_account_name",
      },

      adminAddress: {
        type: DataTypes.STRING(250),
        allowNull: true,
        field: "admin_address",
      },

      adminAender: {
        type: DataTypes.STRING(15),
        allowNull: true,
        field: "admin_gender",
      },

      schoolAddress: {
        type: DataTypes.STRING(250),
        allowNull: true,
        field: "school_address",
      },

      schoolImage: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "school_image",
      },

      schoolPhoneNo: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: "school_phone_no",
      },

      contactPersonImage: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "contact_person_image",
      },

      contactPersonName: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: "contact_person_name",
      },

      contactPersonNumber: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: "contact_person_number",
      },

      contactPersonEmail: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: "contact_person_email",
      },

      contactPersonGender: {
        type: DataTypes.STRING(15),
        allowNull: true,
        field: "contact_person_gender",
      },

      contactPersonTitle: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: "contact_person_title",
      },

      contactPersonAddress: {
        type: DataTypes.STRING(250),
        allowNull: true,
        field: "contact_person_address",
      },

      emergencyContactNumber: {
        type: DataTypes.STRING(45),
        allowNull: true,
        field: "emergency_contact_number",
      },

      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      maxUser: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "max_user",
      },

      packageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "package_id",
      },

      // status: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: true,
      // },

      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field:"parent_id",
        references: {
          model: "users",
          key: "id",
        },
      },

      createdBy: {
        type: DataTypes.INTEGER,
        field: "created_by",
        references: {
          model: "users",
          key: "id",
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        field: "updated_by",
        references: {
          model: "users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    }
  );
  school.associate = function (models) {
    school.belongsTo(models.users, { foreignKey: "userId" });
    school.belongsTo(models.district_admins, {
      foreignKey: "districtId",
      as: "district",
    });
    school.belongsTo(models.subscription_packages, {
      foreignKey: "packageId",
      as: "package",
    });
    school.hasMany(models.report_issues, {
      foreignKey: "schoolId"
      });
      school.hasMany(models.discussion_forums, {
        foreignKey: "schoolId"
        });
        school.hasMany(models.comments, {
          foreignKey: "schoolId"
          });
  };

  return school;
};
