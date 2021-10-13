const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const globalErrorHandler = require("./src/middleware/globalErrorHandler");
const pageNotFoundErrorHandler = require("./src/middleware/pageNotFoundErrorHandler");
const SendSubscriptionEndEmailCron = require("./src/crons/SendSubscriptionEndEmailCron");
const SendGracePeriodEndEmailCron = require("./src/crons/SendGracePeriodEndEmailCron");
const SendSubscriptionRenewalEmailCron = require("./src/crons/SendSubscriptionRenewalEmailCron");
const putSubscriptionOnPauseCron = require("./src/crons/putSubscriptionOnPauseCron");
const putSubscriptionOnResumeCron = require("./src/crons/putSubscriptionOnResumeCron");

// Cron Jobs
SendSubscriptionEndEmailCron();
SendGracePeriodEndEmailCron();
putSubscriptionOnPauseCron();
SendSubscriptionRenewalEmailCron();
putSubscriptionOnResumeCron();

let { StatusCodes } = require("http-status-codes");
let utils = require("./src/helpers/utils");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];
// const audioUploadLocation = config.audio_upload_location;
const excelUploadLocation = config.excel_upload_location;
// const imageUploadLocation = config.image_upload_location;
var fs = require("fs");
var dir = "./uploads";

const app = express();
const debug = require("debug")("myapp:app");

app.use(express.json());
// app.use(logger(process.env.NODE_ENV == "production" ? "combined" : "dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// config
require("dotenv").config();

// database config
const db = require("./src/models/index");

// cors
app.use(cors());

// swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for CMS Admin",
    version: "1.0.0",
    description: "This is a REST API application made with Express.",
  },
  components: {
    securitySchemes: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "token",
        description: "API Key Authentication",
      },
    },
  },
  security: [
    {
      JWT: [],
    },
  ],
  servers: [
    {
      url: "http://localhost:" + config.server.port,
      description: "Local server",
    },
    {
      url: "http://" + config.server.hostname + ":" + config.server.port,
      description: "Development server",
    },
  ],
  schemes: ["https", "http"],
};

const options = {
  docExpansion: "none",
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/controllers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

// image upload static folder
app.use("/uploads", express.static("./uploads"));

// bootstrap routes
app.get("/", (req, res) => {
  res
    .status(StatusCodes.OK)
    .send(
      utils.responseGenerator(
        StatusCodes.OK,
        "Application running successfully"
      )
    );
});
app.use("/api/v1/", require("./src/routes"));
if (process.env.NODE_ENV !== "production")
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, false, options)
  );

// global error handler
app.use(globalErrorHandler);

// handle 404 error
app.use(pageNotFoundErrorHandler);

// Create uploads directory
if (!fs.existsSync(dir)) fs.mkdirSync(dir);
// if (!fs.existsSync(imageUploadLocation)) fs.mkdirSync(imageUploadLocation);
if (!fs.existsSync(excelUploadLocation)) fs.mkdirSync(excelUploadLocation);
// if (!fs.existsSync(audioUploadLocation)) fs.mkdirSync(audioUploadLocation);

// DB connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(config.server.port, () => {
      console.log(`App listening on port: ${config.server.port}`);
      app.emit("appStarted");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = app;
