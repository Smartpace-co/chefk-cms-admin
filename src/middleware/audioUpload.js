const util = require("util");
const multer = require("multer");
const maxSize = 18 * 1024 * 1024;
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const audioUploadLocation = config.audio_upload_location;

const whitelist = [
  "audio/mpeg",
  // "audio/mp4",
  // "audio/x-flac",
  // "audio/wave",
  // "audio/x-ms-wma",
  "audio/x-aac",
  // "audio/wave",
];

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, audioUploadLocation);
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
    if (true) {
      cb(null, true);
    } else {
      req.fileValidationError = "Forbidden extension";
      cb("Please upload only mp3 file.", false, req.fileValidationError);
    }
  },
}).array("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
