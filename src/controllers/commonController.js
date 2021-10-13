let commonService = require("../service/commonService");

/**
 * @swagger
 *   tags:
 *     name: Common
 *     description: API to manage common services.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/imageUpload:
   *   post:
   *     tags: [Common]
   *     summary: Image upload.
   *     requestBody:
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *     responses:
   *       200:
   *         description: Image uploaded successfully successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *                 data:
   *                    type: array
   *                    items :
   *                       type: object
   *                       properties:
   *                          mediaName :
   *                            type: string
   *                          origMediaName :
   *                            type: string
   *                          mediaPath :
   *                            type: string
   *       401:
   *         description: Invalid token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *                 error :
   *                   type: string
   */

  imageUpload: async (req, res, next) => {
    try {
      let response = await commonService.imageUpload(req, res);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/fileUpload:
   *   post:
   *     tags: [Common]
   *     summary: File upload.
   *     requestBody:
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *     responses:
   *       200:
   *         description: File uploaded successfully successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *                 data:
   *                    type: array
   *                    items :
   *                       type: object
   *                       properties:
   *                          mediaName :
   *                            type: string
   *                          origMediaName :
   *                            type: string
   *                          mediaPath :
   *                            type: string
   *       401:
   *         description: Invalid token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *                 error :
   *                   type: string
   */

  fileUpload: async (req, res, next) => {
    try {
      let response = await commonService.fileUpload(req, res);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/file:
   *   post:
   *     tags: [Common]
   *     summary: Download demo file.
   *     responses:
   *       200:
   *         description: Demo file send successfully.
   *       404:
   *         description: Not found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 error :
   *                   type: string
   *       401:
   *         description: Invalid token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *                 error :
   *                   type: string
   */
  getDemoFile: async (req, res, next) => {
    try {
      const { entityType } = req.params;
      await commonService.getDemoFile(req, res, entityType);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/audioUpload:
   *   post:
   *     tags: [Common]
   *     summary: Audio upload.
   *     requestBody:
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: string
   *                 format: binary
   *     responses:
   *       200:
   *         description: File uploaded successfully successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *                 data:
   *                    type: array
   *                    items :
   *                       type: object
   *                       properties:
   *                          mediaName :
   *                            type: string
   *                          origMediaName :
   *                            type: string
   *                          mediaPath :
   *                            type: string
   *       401:
   *         description: Invalid token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *       500:
   *         description: Internal server error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *                 error :
   *                   type: string
   */

  audioUpload: async (req, res, next) => {
    try {
      let response = await commonService.audioUpload(req, res);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
};
