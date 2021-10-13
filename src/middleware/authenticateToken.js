const jwt = require("jsonwebtoken");
let utils = require("../helpers/utils");
let { StatusCodes } = require("http-status-codes");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const jwtAccessToken = config.jwt.access_token;

async function authenticateToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, jwtAccessToken, (err, user) => {
      if (err)
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send(
            utils.responseGenerator(StatusCodes.UNAUTHORIZED, "Invalid Token")
          );
      req.user = user;
      next();
    });
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(utils.responseGenerator(StatusCodes.UNAUTHORIZED, "Invalid Token"));
  }
}

module.exports = authenticateToken;
