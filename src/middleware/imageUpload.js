const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const imageUploadLocation = config.image_upload_location;

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageUploadLocation);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"));
  },
});

let uploadFile = multer({
  // storage: env === "local" ? storage : multer.memoryStorage(),
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },

  fileFilter: (req, file, cb) => {
    if (whitelist.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.fileValidationError = "Forbidden extension";
      cb("Please upload only image file.", false, req.fileValidationError);
    }
  },
}).array("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
