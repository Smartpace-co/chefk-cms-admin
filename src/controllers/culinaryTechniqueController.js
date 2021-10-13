let culinaryTechniqueService = require("../service/culinaryTechniqueService");

/**
 * @swagger
 *   tags:
 *     name: Culinary Technique
 *     description: API to manage culinary techniques.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/culinaryTechnique:
   *   post:
   *     tags: [Culinary Technique]
   *     summary: Create culinary technique.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               culinaryTechniqueTitle:
   *                 type: string
   *               kitchenRequirements:
   *                 type: string
   *               status:
   *                 type: boolean
   *               easyOrdering:
   *                 type: string
   *               video:
   *                 type: string
   *               safetyLevelId:
   *                 type: number
   *               languageId:
   *                 type: number
   *               categoryId:
   *                 type: number
   *               typeId:
   *                 type: number
   *               usesId:
   *                 type: number
   *               tagId:
   *                 type: number
   *               toolRequirements:
   *                 type: array
   *                 items:
   *                   type: number
   *     responses:
   *       200:
   *         description: Culinary technique saved successfully.
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
   *                     id:
   *                       type: number
   *                     culinaryTechniqueTitle:
   *                       type: string
   *                     kitchenRequirements:
   *                       type: string
   *                     status:
   *                       type: boolean
   *                     easyOrdering:
   *                       type: string
   *                     video:
   *                       type: string
   *                     safetyLevelId:
   *                       type: number
   *                     languageId:
   *                       type: number
   *                     categoryId:
   *                       type: number
   *                     typeId:
   *                       type: number
   *                     usesId:
   *                       type: number
   *                     tagId:
   *                       type: number
   *                     toolRequirements:
   *                       type: array
   *                       items:
   *                         type: number
   *                     created_at:
   *                       type: string
   *                     updated_at:
   *                       type: string
   *       409:
   *         description: Culinary technique name already exist.
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

  createCulinaryTechnique: async (req, res, next) => {
    try {
      let response = await culinaryTechniqueService.createCulinaryTechnique(
        req.body,
        req.user
      );
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/culinaryTechnique:
   *   get:
   *     tags: [Culinary Technique]
   *     summary: Get all culinary techniques.
   *     responses:
   *       200:
   *         description: All culinary technique fetched successfully.
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
   *                       culinaryTechniqueTitle:
   *                         type: string
   *                       kitchenRequirements:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       easyOrdering:
   *                         type: string
   *                       video:
   *                         type: string
   *                       safetyLevel:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           safetyLevelTitle:
   *                             type: string
   *                       language:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           language:
   *                             type: string
   *                       category:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           categoryTitle:
   *                             type: string
   *                       type:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           typeTitle:
   *                             type: number
   *                       tag:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           originTitle:
   *                             type: string
   *                       use:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           useTitle:
   *                             type: string
   *                       toolRequirements:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                              id:
   *                                type: number
   *                              tool:
   *                                type: object
   *                                properties:
   *                                   id:
   *                                     type: number
   *                                   toolTitle:
   *                                     type: string
   *                       created_at:
   *                         type: string
   *                       updated_at:
   *                         type: string
   *                       created_by:
   *                         type: number
   *                       updated_by:
   *                         type: number
   *       404:
   *         description: No culinary technique exist.
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

  getAllCulinaryTechniques: async (req, res, next) => {
    try {
      let response = await culinaryTechniqueService.getAllCulinaryTechnique(req.query);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/culinaryTechnique/{id}:
   *   get:
   *     tags: [Culinary Technique]
   *     summary: Get culinary technique.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: Culinary technique details fetched Successfully.
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
   *                       culinaryTechniqueTitle:
   *                         type: string
   *                       kitchenRequirements:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       easyOrdering:
   *                         type: string
   *                       video:
   *                         type: string
   *                       safetyLevel:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           safetyLevelTitle:
   *                             type: string
   *                       language:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           language:
   *                             type: string
   *                       category:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           categoryTitle:
   *                             type: string
   *                       type:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           typeTitle:
   *                             type: number
   *                       tag:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           originTitle:
   *                             type: string
   *                       use:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           useTitle:
   *                             type: string
   *                       toolRequirements:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                              id:
   *                                type: number
   *                              tool:
   *                                type: object
   *                                properties:
   *                                   id:
   *                                     type: number
   *                                   toolTitle:
   *                                     type: string
   *                       created_at:
   *                         type: string
   *                       updated_at:
   *                         type: string
   *                       created_by:
   *                         type: number
   *                       updated_by:
   *                         type: number
   *       404:
   *         description: No culinary technique exist.
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

  getCulinaryTechnique: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await culinaryTechniqueService.getCulinaryTechnique(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/culinaryTechnique/{id}:
   *   put:
   *     tags: [Culinary Technique]
   *     summary: Update culinary technique.
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
   *                  culinaryTechniqueTitle:
   *                    type: string
   *                  kitchenRequirements:
   *                    type: string
   *                  status:
   *                    type: boolean
   *                  easyOrdering:
   *                    type: string
   *                  video:
   *                    type: string
   *                  safetyLevelId:
   *                    type: number
   *                  languageId:
   *                    type: number
   *                  categoryId:
   *                    type: number
   *                  typeId:
   *                    type: number
   *                  usesId:
   *                    type: number
   *                  tagId:
   *                    type: number
   *                  toolRequirements:
   *                    type: array
   *                    items:
   *                         type: number
   *     responses:
   *       200:
   *         description: Culinary technique details updated Successfully
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
   *         description: Culinary technique not exist.
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
   *         description: Culinary technique name already exist.
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

  updateCulinaryTechnique: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await culinaryTechniqueService.updateCulinaryTechnique(
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
   * /api/v1/culinaryTechnique/{id}:
   *   delete:
   *     tags: [Culinary Technique]
   *     summary: Delete culinary technique.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: Culinary technique details deleted Successfully.
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

  deleteCulinaryTechnique: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await culinaryTechniqueService.deleteCulinaryTechnique(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
};
