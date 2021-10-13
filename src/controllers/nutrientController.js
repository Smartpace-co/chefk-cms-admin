let nutrientService = require("../service/nutrientService");

/**
 * @swagger
 *   tags:
 *     name: Nutrient
 *     description: API to manage nutrients.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/nutrient:
   *   post:
   *     tags: [Nutrient]
   *     summary: Create nutrient.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nutrientTitle:
   *                 type: string
   *               description:
   *                 type: string
   *               status:
   *                 type: boolean
   *               safetyLevelId:
   *                 type: number
   *               categoryId:
   *                 type: number
   *               typeId:
   *                 type: number
   *               usesId:
   *                 type: number
   *               originId:
   *                 type: number
   *               relatedQuestions:
   *                 type: array
   *                 items:
   *                   type: string
   *     responses:
   *       200:
   *         description: Nutrient saved successfully.
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
   *                       nutrientTitle:
   *                         type: string
   *                       description:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       safetyLevelId:
   *                         type: number
   *                       categoryId:
   *                         type: number
   *                       typeId:
   *                         type: number
   *                       usesId:
   *                         type: number
   *                       originId:
   *                         type: number
   *                       relatedQuestions:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                              id:
   *                                type: number
   *                              question:
   *                                type: string
   *                       created_at:
   *                         type: string
   *                       updated_at:
   *                         type: string
   *       409:
   *         description: Nutrient name already exist.
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

  createNutrient: async (req, res, next) => {
    try {
      let response = await nutrientService.createNutrient(req.body, req.user);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/nutrient:
   *   get:
   *     tags: [Nutrient]
   *     summary: Get all nutrinets.
   *     responses:
   *       200:
   *         description: All nutrinets fetched successfully.
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
   *                       nutrientlTitle:
   *                         type: string
   *                       description:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       safetyLevel:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           safetyLevelTitle:
   *                             type: number
   *                       category:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           categoryTitle:
   *                             type: number
   *                       type:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           typeTitle:
   *                             type: number
   *                       origin:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           originTitle:
   *                             type: number
   *                       use:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           useTitle:
   *                             type: number
   *                       relatedQuestions:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                              id:
   *                                type: number
   *                              question:
   *                                type: string
   *                       created_at:
   *                         type: string
   *                       updated_at:
   *                         type: string
   *                       created_by:
   *                         type: number
   *                       updated_by:
   *                         type: number
   *       404:
   *         description: No nutrient exist.
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

  getAllNutrients: async (req, res, next) => {
    try {
      let response = await nutrientService.getAllNutrients(req.query);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/nutrient/{id}:
   *   get:
   *     tags: [Nutrient]
   *     summary: Get nutrient.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: nutrient details fetched Successfully.
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
   *                       nutrientTitle:
   *                         type: string
   *                       description:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       safetyLevel:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           safetyLevelTitle:
   *                             type: number
   *                       category:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           categoryTitle:
   *                             type: number
   *                       type:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           typeTitle:
   *                             type: number
   *                       origin:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           originTitle:
   *                             type: number
   *                       use:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           useTitle:
   *                             type: number
   *                       relatedQuestions:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                              id:
   *                                type: number
   *                              question:
   *                                type: string
   *                       created_at:
   *                         type: string
   *                       updated_at:
   *                         type: string
   *                       created_by:
   *                         type: number
   *                       updated_by:
   *                         type: number
   *       404:
   *         description: No nutrient exist.
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

  getNutrient: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await nutrientService.getNutrient(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/nutrient/{id}:
   *   put:
   *     tags: [Nutrient]
   *     summary: Update nutrient.
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
   *                 nutrientTitle:
   *                   type: string
   *                 description:
   *                   type: string
   *                 status:
   *                   type: boolean
   *                 image:
   *                   type: string
   *                 safetyLevelId:
   *                   type: number
   *                 difficultyLevelId:
   *                   type: number
   *                 categoryId:
   *                   type: number
   *                 typeId:
   *                   type: number
   *                 usesId:
   *                   type: number
   *                 originId:
   *                   type: number
   *                 relatedQuestions:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                        id:
   *                          type: number
   *                        question:
   *                          type: string
   *     responses:
   *       200:
   *         description: Nutrient details updated Successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status :
   *                   type: number
   *                 message :
   *                   type: string
   *       404:
   *         description: Nutrient not exist.
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
   *         description: Nutrient already exist.
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

  updateNutrient: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await nutrientService.updateNutrient(
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
   * /api/v1/nutrient/{id}:
   *   delete:
   *     tags: [Nutrient]
   *     summary: Delete nutrient.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: Nutrient details deleted Successfully.
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

  deleteNutrient: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await nutrientService.deleteNutrient(id, req.user);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
};
