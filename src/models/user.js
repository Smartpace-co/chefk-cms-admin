"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING(90),
        allowNull: false,
      },

      roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "role_id",
        references: {
          model: "roles",
          key: "id",
        },
      },

      parent_role_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "roles",
          key: "id",
        },
      },

      email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
      },

      phoneNumber: {
        type: DataTypes.STRING(45),
        field: "phone_number",
        allowNull: true,
      },

      password: {
        type: DataTypes.STRING(145),
        allowNull: false,
      },

      token: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },

      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_admin",
      },

      isSubscriptionPause: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_subscription_pause",
      },

      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      profileImage: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "profile_image",
      },

      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_email_verified",
      },

      isPhoneVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_phone_verified",
      },
      from_clever: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
          field: "created_by",
        },
      },

      updatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
          field: "updated_by",
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
  user.associate = function (models) {
    user.belongsTo(models.roles, { foreignKey: "roleId" });
    user.hasOne(models.district_admins, { foreignKey: "userId" });
    user.hasMany(models.report_issues, { foreignKey: "userId" });
    user.hasMany(models.discussion_forums, { foreignKey: "userId" });
    user.hasMany(models.comments, { foreignKey: "userId" });
    user.hasOne(models.schools, { foreignKey: "userId" });
  };

  return user;
};
