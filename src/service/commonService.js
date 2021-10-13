const imageUpload = require("../middleware/imageUpload");
const fileUpload = require("../middleware/fileUpload");
const audioUpload = require("../middleware/audioUpload");
let utils = require("../helpers/utils");
let { StatusCodes } = require("http-status-codes");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config")[env];
const audioUploadLocation = config.audio_upload_location;
const excelUploadLocation = config.excel_upload_location;
const imageUploadLocation = config.image_upload_location;

module.exports = {
  imageUpload: async (req, res) => {
    try {
      await imageUpload(req, res);

      if (!req.files)
        return utils.responseGenerator(
          StatusCodes.BAD_REQUEST,
          "Please upload a file!"
        );

      // if (env === "local") {
      //   let results = req.files.map((file) => {
      //     return {
      //       mediaName: file.filename,
      //       origMediaName: file.originalname,
      //       mediaPath:
      //         "http://" +
      //         req.headers.host +
      //         imageUploadLocation.replace(".", "") +
      //         "/" +
      //         file.filename,
      //     };
      //   });
      //   return utils.responseGenerator(
      //     StatusCodes.OK,
      //     "Image uploaded successfully successfully",
      //     results
      //   );
      // } else {
      const gcImageDetils = await utils.gcUpload(req.files, "images");
      return utils.responseGenerator(
        StatusCodes.OK,
        "Image uploaded successfully successfully",
        gcImageDetils
      );
      // }
    } catch (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return utils.responseGenerator(
          StatusCodes.BAD_REQUEST,
          "File size cannot be larger than 2MB!"
        );
      } else if (req.fileValidationError) {
        return utils.responseGenerator(StatusCodes.BAD_REQUEST, err);
      }
      console.log("Error ==> ", err);
      throw err;
    }
  },

  fileUpload: async (req, res) => {
    try {
      await fileUpload(req, res);

      if (!req.files)
        return utils.responseGenerator(
          StatusCodes.BAD_REQUEST,
          "Please upload a file!"
        );

      // if (env === "local") {
      let results = req.files.map((file) => {
        return {
          mediaName: file.filename,
          origMediaName: file.originalname,
          mediaPath:
            "http://" +
            req.headers.host +
            excelUploadLocation.replace(".", "") +
            "/" +
            file.filename,
        };
      });
      return utils.responseGenerator(
        StatusCodes.OK,
        "File uploaded successfully",
        results
      );
      // } else {
      //   const gcFileDetils = await utils.gcUpload(req.files, "documents");
      //   return utils.responseGenerator(
      //     StatusCodes.OK,
      //     "File uploaded successfully",
      //     gcFileDetils
      //   );
      // }
    } catch (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return utils.responseGenerator(
          StatusCodes.BAD_REQUEST,
          "File size cannot be larger than 2MB!"
        );
      } else if (req.fileValidationError) {
        return utils.responseGenerator(StatusCodes.BAD_REQUEST, err);
      }
      console.log("Error ==> ", err, req.fileValidationError);
      throw err;
    }
  },

  getDemoFile: async (req, res) => {
    try {
      const file = excelUploadLocation + "/lesson.xlsx";
      res.download(file, "lesson", (error) => {
        if (error)
          res
            .status(error.statusCode)
            .send({ status: error.statusCode, error: error.message });
      });
    } catch (err) {
      console.log("Error ==> ", err);
      throw err;
    }
  },

  audioUpload: async (req, res) => {
    try {
      await audioUpload(req, res);
      if (!req.files)
        return utils.responseGenerator(
          StatusCodes.BAD_REQUEST,
          "Please upload a file!"
        );

      // if (env === "local") {
      //   let results = req.files.map((file) => {
      //     return {
      //       mediaName: file.filename,
      //       origMediaName: file.originalname,
      //       mediaPath:
      //         "http://" +
      //         req.headers.host +
      //         audioUploadLocation.replace(".", "") +
      //         "/" +
      //         file.filename,
      //     };
      //   });
      //   return utils.responseGenerator(
      //     StatusCodes.OK,
      //     "File uploaded successfully",
      //     results
      //   );
      // } else {
      const gcAudioDetils = await utils.gcUpload(req.files, "audio");
      return utils.responseGenerator(
        StatusCodes.OK,
        "File uploaded successfully",
        gcAudioDetils
      );
      // }
    } catch (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return utils.responseGenerator(
          StatusCodes.BAD_REQUEST,
          "File size cannot be larger than 2MB!"
        );
      } else if (req.fileValidationError) {
        return utils.responseGenerator(StatusCodes.BAD_REQUEST, err);
      }
      console.log("Error ==> ", err, req.fileValidationError);
      throw err;
    }
  },
};
