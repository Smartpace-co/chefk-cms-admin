require("dotenv").config();

module.exports = {
  local: {
    server: {
      protocol: process.env.PROTOCAL || "http",
      port: process.env.PORT || 3000,
      hostname: process.env.HOST || "localhost",
      web_portal_host: process.env.WEB_PORTAL_HOST || "localhost",
      web_portal_port: process.env.WEB_PORTAL_PORT || 3002,
    },
    logging: process.env.DB_LOGGING == "true" || false,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root@123",
    database: process.env.DB_NAME || "CMS",
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_HOST || "127.0.0.1",
    dialectOptions: {
      connectTimeout: 60000,
    },
    pool: {
      max: 25,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    seederStorage: "sequelize",
    gc_bucket: process.env.GC_BUCKET,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND || 12,
    excel_upload_location: process.env.EXCEL_FILE_UPLOAD_LOCATION,
    audio_upload_location: process.env.AUDIO_FILE_UPLOAD_LOCATION,
    image_upload_location: process.env.IMAGE_UPLOAD_LOCATION,
    jwt: {
      access_token: process.env.JWT_ACCESS_TOKEN,
      expires_in: process.env.JWT_EXPIRES_IN || "8h",
      reset_password_expires_in:
        process.env.JWT_RESET_PASSWORD_EXPIRES_IN || "1h",
    },
    reset_password_path: process.env.RESET_PASSWORD_PATH,
    generate_password_path: process.env.GENERATE_PASSWORD_PATH,
    web_portal_root_path: process.env.WEB_PORTAL_ROOT_PATH,
    web_portal_reset_password_path:
      process.env.WEB_PORTAL_RESET_PASSWORD_PATH || "/auth/reset-password",
    web_portal_generate_password_path:
      process.env.WEB_PORTAL_GENERATE_PASSWORD_PATH,
    web_portal_district_registration_path:
      process.env.WEB_PORTAL_DISTRICT_REGISTRATION_PATH ||
      "/auth/register-admin",
    web_portal_school_registration_path:
      process.env.WEB_PORTAL_SCHOOL_REGISTRATION_PATH ||
      "/auth/register-school",
    web_portal_teacher_registration_path:
      process.env.WEB_PORTAL_TEACHER_REGISTRATION_PATH ||
      "/auth/register-teacher",
    web_portal_student_registration_path:
      process.env.WEB_PORTAL_STUDENT_REGISTRATION_PATH ||
      "/auth/student-signup",

    sendgrid: {
      api_key: process.env.SENDGRID_API_KEY,
      from_email: process.env.SENDGRID_FROM_EMAIL,
      reset_password_template_id:
        process.env.SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
      subscription_plan_expiration_template_id:
        process.env.SENDGRID_SUBSCRIPTION_PLAN_EXPIRATION_TEMPLATE_ID,
      subscription_grace_period_end_template_id:
        process.env.SENDGRID_SUBSCRIPTION_GRACE_PERIOD_END_TEMPLATE_ID,
      subscription_renewal_template_id:
        process.env.SENDGRID_SUBSCRIPTION_RENEWAL_TEMPLATE_ID,
      general_template_id: process.env.SENDGRID_GENERAL_TEMPLATE_ID,
      generate_password_template_id:
        process.env.SENDGRID_GENERATE_PASSWORD_TEMPLATE_ID,
    },
    stripe: {
      api_key: process.env.STRIPE_API_KEY,
      currency: process.env.STRIPE_CURRENCY || "USD",
    },
  },

  development: {
    server: {
      protocol: process.env.PROTOCAL || "http",
      hostname: process.env.HOST,
      port: process.env.PORT || 3001,
      web_portal_host: process.env.WEB_PORTAL_HOST,
      web_portal_port: process.env.WEB_PORTAL_PORT || 3002,
    },
    logging: process.env.DB_LOGGING == "true" || false,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "CMS",
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_HOST || "127.0.0.1",
    seederStorage: "sequelize",
    gc_bucket: process.env.GC_BUCKET,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND || 12,
    excel_upload_location: process.env.EXCEL_FILE_UPLOAD_LOCATION,
    audio_upload_location: process.env.AUDIO_FILE_UPLOAD_LOCATION,
    image_upload_location: process.env.IMAGE_UPLOAD_LOCATION,
    jwt: {
      access_token: process.env.JWT_ACCESS_TOKEN,
      expires_in: process.env.JWT_EXPIRES_IN || "8h",
      reset_password_expires_in:
        process.env.JWT_RESET_PASSWORD_EXPIRES_IN || "1h",
    },
    reset_password_path: process.env.RESET_PASSWORD_PATH,
    generate_password_path: process.env.GENERATE_PASSWORD_PATH,
    web_portal_root_path: process.env.WEB_PORTAL_ROOT_PATH,
    web_portal_reset_password_path:
      process.env.WEB_PORTAL_RESET_PASSWORD_PATH || "/auth/reset-password",
    web_portal_generate_password_path:
      process.env.WEB_PORTAL_GENERATE_PASSWORD_PATH,
    web_portal_district_registration_path:
      process.env.WEB_PORTAL_DISTRICT_REGISTRATION_PATH ||
      "/auth/register-admin",
    web_portal_school_registration_path:
      process.env.WEB_PORTAL_SCHOOL_REGISTRATION_PATH ||
      "/auth/register-school",
    web_portal_teacher_registration_path:
      process.env.WEB_PORTAL_TEACHER_REGISTRATION_PATH ||
      "/auth/register-teacher",
    web_portal_student_registration_path:
      process.env.WEB_PORTAL_STUDENT_REGISTRATION_PATH ||
      "/auth/student-signup",

    sendgrid: {
      api_key: process.env.SENDGRID_API_KEY,
      from_email: process.env.SENDGRID_FROM_EMAIL,
      reset_password_template_id:
        process.env.SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
      subscription_plan_expiration_template_id:
        process.env.SENDGRID_SUBSCRIPTION_PLAN_EXPIRATION_TEMPLATE_ID,
      subscription_grace_period_end_template_id:
        process.env.SENDGRID_SUBSCRIPTION_GRACE_PERIOD_END_TEMPLATE_ID,
      subscription_renewal_template_id:
        process.env.SENDGRID_SUBSCRIPTION_RENEWAL_TEMPLATE_ID,
      general_template_id: process.env.SENDGRID_GENERAL_TEMPLATE_ID,
      generate_password_template_id:
        process.env.SENDGRID_GENERATE_PASSWORD_TEMPLATE_ID,
    },
    stripe: {
      api_key: process.env.STRIPE_API_KEY,
      currency: process.env.STRIPE_CURRENCY || "USD",
    },
  },

  stage: {
    server: {
      protocol: process.env.PROTOCAL,
      port: process.env.PORT,
      hostname: process.env.HOST,
      web_portal_host: process.env.WEB_PORTAL_HOST,
      web_portal_port: process.env.WEB_PORTAL_PORT,
    },
    logging: process.env.DB_LOGGING == "true" || false,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    dialectOptions: {
      connectTimeout: 60000,
    },
    pool: {
      max: 25,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    seederStorage: "sequelize",
    gc_bucket: process.env.GC_BUCKET,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND || 12,
    excel_upload_location: process.env.EXCEL_FILE_UPLOAD_LOCATION,
    audio_upload_location: process.env.AUDIO_FILE_UPLOAD_LOCATION,
    image_upload_location: process.env.IMAGE_UPLOAD_LOCATION,
    jwt: {
      access_token: process.env.JWT_ACCESS_TOKEN,
      expires_in: process.env.JWT_EXPIRES_IN || "8h",
      reset_password_expires_in:
        process.env.JWT_RESET_PASSWORD_EXPIRES_IN || "1h",
    },
    reset_password_path: process.env.RESET_PASSWORD_PATH,
    generate_password_path: process.env.GENERATE_PASSWORD_PATH,
    web_portal_root_path: process.env.WEB_PORTAL_ROOT_PATH,
    web_portal_reset_password_path:
      process.env.WEB_PORTAL_RESET_PASSWORD_PATH || "/auth/reset-password",
    web_portal_generate_password_path:
      process.env.WEB_PORTAL_GENERATE_PASSWORD_PATH,
    web_portal_district_registration_path:
      process.env.WEB_PORTAL_DISTRICT_REGISTRATION_PATH ||
      "/auth/register-admin",
    web_portal_school_registration_path:
      process.env.WEB_PORTAL_SCHOOL_REGISTRATION_PATH ||
      "/auth/register-school",
    web_portal_teacher_registration_path:
      process.env.WEB_PORTAL_TEACHER_REGISTRATION_PATH ||
      "/auth/register-teacher",
    web_portal_student_registration_path:
      process.env.WEB_PORTAL_STUDENT_REGISTRATION_PATH ||
      "/auth/student-signup",

    sendgrid: {
      api_key: process.env.SENDGRID_API_KEY,
      from_email: process.env.SENDGRID_FROM_EMAIL,
      reset_password_template_id:
        process.env.SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
      subscription_plan_expiration_template_id:
        process.env.SENDGRID_SUBSCRIPTION_PLAN_EXPIRATION_TEMPLATE_ID,
      subscription_grace_period_end_template_id:
        process.env.SENDGRID_SUBSCRIPTION_GRACE_PERIOD_END_TEMPLATE_ID,
      subscription_renewal_template_id:
        process.env.SENDGRID_SUBSCRIPTION_RENEWAL_TEMPLATE_ID,
      general_template_id: process.env.SENDGRID_GENERAL_TEMPLATE_ID,
      generate_password_template_id:
        process.env.SENDGRID_GENERATE_PASSWORD_TEMPLATE_ID,
    },
    stripe: {
      api_key: process.env.STRIPE_API_KEY,
      currency: process.env.STRIPE_CURRENCY || "USD",
    },
  },

  prod: {
    server: {
      protocol: process.env.PROTOCAL,
      port: process.env.PORT,
      hostname: process.env.HOST,
      web_portal_host: process.env.WEB_PORTAL_HOST,
      web_portal_port: process.env.WEB_PORTAL_PORT,
    },
    logging: process.env.DB_LOGGING == "true" || false,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    dialectOptions: {
      connectTimeout: 60000,
    },
    pool: {
      max: 25,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    seederStorage: "sequelize",
    gc_bucket: process.env.GC_BUCKET,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND || 12,
    excel_upload_location: process.env.EXCEL_FILE_UPLOAD_LOCATION,
    audio_upload_location: process.env.AUDIO_FILE_UPLOAD_LOCATION,
    image_upload_location: process.env.IMAGE_UPLOAD_LOCATION,
    jwt: {
      access_token: process.env.JWT_ACCESS_TOKEN,
      expires_in: process.env.JWT_EXPIRES_IN || "8h",
      reset_password_expires_in:
        process.env.JWT_RESET_PASSWORD_EXPIRES_IN || "1h",
    },
    reset_password_path: process.env.RESET_PASSWORD_PATH,
    generate_password_path: process.env.GENERATE_PASSWORD_PATH,
    web_portal_root_path: process.env.WEB_PORTAL_ROOT_PATH,
    web_portal_reset_password_path:
      process.env.WEB_PORTAL_RESET_PASSWORD_PATH || "/auth/reset-password",
    web_portal_generate_password_path:
      process.env.WEB_PORTAL_GENERATE_PASSWORD_PATH,
    web_portal_district_registration_path:
      process.env.WEB_PORTAL_DISTRICT_REGISTRATION_PATH ||
      "/auth/register-admin",
    web_portal_school_registration_path:
      process.env.WEB_PORTAL_SCHOOL_REGISTRATION_PATH ||
      "/auth/register-school",
    web_portal_teacher_registration_path:
      process.env.WEB_PORTAL_TEACHER_REGISTRATION_PATH ||
      "/auth/register-teacher",
    web_portal_student_registration_path:
      process.env.WEB_PORTAL_STUDENT_REGISTRATION_PATH ||
      "/auth/student-signup",

    sendgrid: {
      api_key: process.env.SENDGRID_API_KEY,
      from_email: process.env.SENDGRID_FROM_EMAIL,
      reset_password_template_id:
        process.env.SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
      subscription_plan_expiration_template_id:
        process.env.SENDGRID_SUBSCRIPTION_PLAN_EXPIRATION_TEMPLATE_ID,
      subscription_grace_period_end_template_id:
        process.env.SENDGRID_SUBSCRIPTION_GRACE_PERIOD_END_TEMPLATE_ID,
      subscription_renewal_template_id:
        process.env.SENDGRID_SUBSCRIPTION_RENEWAL_TEMPLATE_ID,
      general_template_id: process.env.SENDGRID_GENERAL_TEMPLATE_ID,
      generate_password_template_id:
        process.env.SENDGRID_GENERATE_PASSWORD_TEMPLATE_ID,
    },
    stripe: {
      api_key: process.env.STRIPE_API_KEY,
      currency: process.env.STRIPE_CURRENCY || "USD",
    },
  },
};
