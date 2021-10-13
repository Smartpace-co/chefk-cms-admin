const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket(config.gc_bucket);
const { format } = require("util");
let saltRound = parseInt(config.bcrypt_salt_round);
let apiKey = config.sendgrid.api_key;
let fromEmail = config.sendgrid.from_email;

module.exports = {
  randomString(length) {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i += 1) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  responseGenerator(status, message, data, isError = false) {
    return {
      status: status,
      message: message.replace(/\"/g, ""),
      [isError ? "error" : "data"]: data,
    };
  },

  passwordComparison(inputPassword, userPassword) {
    return bcrypt.compare(inputPassword, userPassword);
  },

  bcryptPassword(password) {
    return bcrypt.hash(password, saltRound);
  },

  sendEmail: async (email, templateId, templateData) => {
    try {
      sgMail.setApiKey(apiKey);
      const msg = {
        to: email,
        from: fromEmail,
        templateId: templateId,
        dynamic_template_data: templateData || {},
      };
      await sgMail.send(msg);
      console.log("Email send successfully");
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  sendBulkEmails: async (emailsAndTemplateData, templateId, subject) => {
    try {
      sgMail.setApiKey(apiKey);
      const msg = emailsAndTemplateData.map((e) => {
        return {
          ...e,
          from: fromEmail,
          templateId: templateId,
          subject: subject,
        };
      });
      await sgMail.send(msg);
      console.log("Email send successfully");
    } catch (err) {
      console.log("Error ==> ", JSON.stringify(err));
      throw err;
    }
  },

  encrypt(text) {
    return Buffer.from(text).toString("base64");
  },

  getUUID: (prefix) => {
    return prefix + "#" + Date.now();
  },

  gcUpload: async (files, directory) => {
    try {
      let streamPromise = [];
      files.forEach((file) => {
        const { originalname, buffer } = file;
        streamPromise.push(
          new Promise(function (resolve, reject) {
            const blob = bucket.file(
              directory +
                "/" +
                Date.now() +
                "-" +
                originalname.replace(/\s+/g, "-")
            );
            const blobStream = blob.createWriteStream({
              resumable: false,
            });
            blobStream
              .on("finish", () => {
                const publicUrl = format(
                  `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                );
                resolve(publicUrl);
              })
              .on("error", (err) => {
                console.log("Error ==> ", err);
                reject(`Unable to upload image, something went wrong`);
              })
              .end(buffer);
          })
        );
      });
      const uploadedFiles = await Promise.all(streamPromise);
      return files.map((file, index) => {
        return {
          // mediaName: ,
          origMediaName: file.originalname,
          mediaPath: uploadedFiles[index],
        };
      });
    } catch (err) {
      throw err;
    }
  },
};
