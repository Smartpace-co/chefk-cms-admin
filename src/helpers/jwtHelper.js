const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const accessTokenSecret = config.jwt.access_token;
const expiresIn = config.jwt.expires_in;
const resetPasswordExpiresIn = config.jwt.reset_password_expires_in;

module.exports = {
  getAccessToken(user) {
    const accessToken = jwt.sign({ id: user.id }, accessTokenSecret, {
      expiresIn: expiresIn,
    });
    return accessToken;
  },

  getAccessTokenForRestPassword(user) {
    const accessToken = jwt.sign({ id: user.id }, accessTokenSecret, {
      expiresIn: resetPasswordExpiresIn,
    });
    return accessToken;
  },
};
