let toolService = require("../service/toolService");

/**
 * @swagger
 *   tags:
 *     name: Tool
 *     description: API to manage tools.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/tool:
   *   post:
   *     tags: [Tool]
   *     summary: Create tool.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               toolTitle:
   *                 type: string
   *               description:
   *                 type: string
   *               status:
   *                 type: boolean
   *               image:
   *                 type: string
   *               safetyLevelId:
   *                 type: number
   *               difficultyLevelId:
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
   *         description: Tool saved successfully.
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
   *                       toolTitle:
   *                         type: string
   *                       description:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       image:
   *                         type: string
   *                       safetyLevelId:
   *                         type: number
   *                       difficultyLevelId:
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
   *         description: Tool name already exist.
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

  createTool: async (req, res, next) => {
    try {
      let response = await toolService.createTool(req.body, req.user);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/tool:
   *   get:
   *     tags: [Tool]
   *     summary: Get all tools.
   *     responses:
   *       200:
   *         description: All tool fetched successfully.
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
   *                       toolTitle:
   *                         type: string
   *                       description:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       image:
   *                         type: string
   *                       safetyLevel:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           safetyLevelTitle:
   *                             type: number
   *                       difficultyLevel:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           difficultyLevelTitle:
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
   *         description: No tool exist.
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

  getAllTools: async (req, res, next) => {
    try {
      let response = await toolService.getAllTools(req.query);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/tool/{id}:
   *   get:
   *     tags: [Tool]
   *     summary: Get tool.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: tool details fetched Successfully.
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
   *                       toolTitle:
   *                         type: string
   *                       description:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       image:
   *                         type: string
   *                       safetyLevel:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           safetyLevelTitle:
   *                             type: number
   *                       difficultyLevel:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           difficultyLevelTitle:
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
   *         description: No tool exist.
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

  getTool: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await toolService.getTool(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/tool/{id}:
   *   put:
   *     tags: [Tool]
   *     summary: Update tool.
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
   *                toolTitle:
   *                  type: string
   *                description:
   *                  type: string
   *                status:
   *                  type: boolean
   *                image:
   *                  type: string
   *                safetyLevelId:
   *                  type: number
   *                difficultyLevelId:
   *                  type: number
   *                categoryId:
   *                  type: number
   *                typeId:
   *                  type: number
   *                usesId:
   *                  type: number
   *                originId:
   *                  type: number
   *                relatedQuestions:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                       id:
   *                         type: number
   *                       question:
   *                         type: string
   *     responses:
   *       200:
   *         description: Tool details updated Successfully
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
   *         description: Tool not exist.
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
   *         description: Tool already exist.
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

  updateTool: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await toolService.updateTool(req.body, req.user, id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/tool/{id}:
   *   delete:
   *     tags: [Tool]
   *     summary: Delete tool.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: Tool Details deleted Successfully.
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

  deleteTool: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await toolService.deleteTool(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
};
