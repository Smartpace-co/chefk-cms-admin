let standardService = require("../service/standardService");

/**
 * @swagger
 *   tags:
 *     name: Standard
 *     description: API to manage standards.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/standard:
   *   post:
   *     tags: [Standard]
   *     summary: Create standard.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               standardTitle:
   *                 type: string
   *               description:
   *                 type: string
   *               status:
   *                 type: boolean
   *               subject_id:
   *                 type: number
   *     responses:
   *       200:
   *         description: Standard saved successfully.
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
   *                   type: object
   *                   properties:
   *                       id:
   *                         type: number
   *                       standardTitle:
   *                         type: string
   *                       description:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       subject_id:
   *                         type: number
   *                       created_at:
   *                         type: string
   *                       updated_at:
   *                         type: string
   *       404:
   *         description: Subject not exist.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *       409:
   *         description: Standard already exist.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
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

  createStandard: async (req, res, next) => {
    try {
      let response = await standardService.createStandard(req.body, req.user);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/standard:
   *   get:
   *     tags: [Standard]
   *     summary: Get all standard.
   *     responses:
   *       200:
   *         description: All standard fetched successfully.
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
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: number
   *                       standardTitle:
   *                         type: string
   *                       description:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       created_at:
   *                         type: string
   *                       updated_at:
   *                         type: string
   *                       created_by:
   *                         type: number
   *                       updated_by:
   *                         type: number
   *                       subject:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           subjectTitle:
   *                             type: string
   *                           description:
   *                             type: string
   *       404:
   *         description: No standard exist.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
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

  getAllStandards: async (req, res, next) => {
    try {
      let response = await standardService.getAllStandards(req.query);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/standard/{id}:
   *   get:
   *     tags: [Standard]
   *     summary: Get standard.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: standard details fetched Successfully.
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
   *                   type: object
   *                   properties:
   *                       standardTitle:
   *                         type: string
   *                       description:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       created_at:
   *                         type: string
   *                       updated_at:
   *                         type: string
   *                       created_by:
   *                         type: number
   *                       updated_by:
   *                         type: number
   *                       subject:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           subjectTitle:
   *                             type: string
   *                           description:
   *                             type: string
   *       404:
   *         description: No standard exist.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
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

  getStandard: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await standardService.getStandard(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/standard/{id}:
   *   put:
   *     tags: [Standard]
   *     summary: Update standard.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               standardTitle:
   *                 type: string
   *               description:
   *                 type: string
   *               status:
   *                 type: boolean
   *               subject_id:
   *                 type: number
   *     responses:
   *       200:
   *         description: Standard details updated Successfully
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
   *                   type: object
   *                   properties:
   *                       standardTitle:
   *                         type: string
   *                       description:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       subject_id:
   *                         type: number
   *                       created_at:
   *                         type: string
   *                       updated_at:
   *                         type: string
   *       404:
   *         description: Standard not exist.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *       409:
   *         description: Standard already exist.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
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

  updateStandard: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await standardService.updateStandard(
        req.body,
        req.user,
        id
      );
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/standard/{id}:
   *   delete:
   *     tags: [Standard]
   *     summary: Delete standard.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: Standard Details deleted Successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
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

  deleteStandard: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await standardService.deleteStandard(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
};
