let { StatusCodes } = require("http-status-codes");
let utils = require("../helpers/utils");

function globalErrorHandler(err, req, res, next) {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(
      utils.responseGenerator(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Internal Server Error",
        err,
        true
      )
    );
}

module.exports = globalErrorHandler;
