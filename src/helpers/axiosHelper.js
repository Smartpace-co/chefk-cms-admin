const axios = require("axios");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const protocol = config.server.protocol;
const webPortalHost = config.server.web_portal_host;
const webPortalPort = config.server.web_portal_port;

module.exports = {
  webPortalLogin: async (email, password) => {
    try {
      const response = await axios.post(
        `${protocol}://${webPortalHost}:${webPortalPort}/api/v1/login`,
        {
          username: email,
          password: password,
        }
      );
      return response.data.data;
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },
};
