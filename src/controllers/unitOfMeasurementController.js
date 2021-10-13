let unitOfMeasurementService = require("../service/unitOfMeasurementService");

/**
 * @swagger
 *   tags:
 *     name: Unit Of Measurement
 *     description: API to manage unit of measurements.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/unitOfMeasurement:
   *   post:
   *     tags: [Unit Of Measurement]
   *     summary: Create Unit of measurement.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               unitOfMeasure:
   *                 type: string
   *               description:
   *                 type: string
   *               status:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Unit of measurement saved successfully.
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
   *                       unitOfMeasure:
   *                         type: string
   *                       description:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       created_at:
   *                         type: string
   *                       updated_at:
   *                         type: string
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

  createUnitOfMeasurement: async (req, res, next) => {
    try {
      let response = await unitOfMeasurementService.createUnitOfMeasurement(req.body, req.user);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/unitOfMeasurement:
   *   get:
   *     tags: [Unit Of Measurement]
   *     summary: Get all unit of measurements.
   *     responses:
   *       200:
   *         description: All unit of measurements fetched successfully.
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
   *                       unitOfMeasure:
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
   *       404:
   *         description: No unit of measurement exist.
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

  getAllUnitOfMeasurements: async (req, res, next) => {
    try {
      let response = await unitOfMeasurementService.getAllUnitOfMeasurements(req.query);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/unitOfMeasurement/{id}:
   *   get:
   *     tags: [Unit Of Measurement]
   *     summary: Get unit of measurements.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: unit of measurement details fetched Successfully.
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
   *                       unitOfMeasure:
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
   *       404:
   *         description: No unit of measurement exist.
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

  getUnitOfMeasurement: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await unitOfMeasurementService.getUnitOfMeasurement(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/unitOfMeasurement/{id}:
   *   put:
   *     tags: [Unit Of Measurement]
   *     summary: Update unit of measurement.
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
   *               unitOfMeasure:
   *                 type: string
   *               description:
   *                 type: string
   *               status:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Unit of measurement details updated Successfully.
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
   *                       unitOfMeasure:
   *                         type: string
   *                       description:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       created_at:
   *                         type: string
   *                       updated_at:
   *                         type: string
   *       404:
   *         description: No unit of measurement exist.
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

  updateUnitOfMeasurement: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await unitOfMeasurementService.updateUnitOfMeasurement(req.body, req.user, id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/unitOfMeasurement/{id}:
   *   delete:
   *     tags: [Unit Of Measurement]
   *     summary: Delete unit of measurement.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: Unit Of Measurement Details deleted Successfully.
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

  deleteUnitOfMeasurement: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await unitOfMeasurementService.deleteUnitOfMeasurement(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
};
