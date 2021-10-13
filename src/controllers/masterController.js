let masterService = require("../service/masterService");

/**
 * @swagger
 *   tags:
 *     name: Master
 *     description: API to manage masters.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/master/safetyLevel:
   *   get:
   *     tags: [Master]
   *     summary: Get safety levles.
   *     responses:
   *       200:
   *         description: Safety levels fetched successfully.
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
   *                       safetyLevelTitle:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No safety level exist.
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

  getSafetyLevels: async (req, res, next) => {
    try {
      let response = await masterService.getSafetyLevels();
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/difficultyLevel:
   *   get:
   *     tags: [Master]
   *     summary: Get difficulty levles.
   *     responses:
   *       200:
   *         description: Difficulty levels fetched successfully.
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
   *                       difficultyLevelTitle:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No difficulty level exist.
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

  getDifficultyLevels: async (req, res, next) => {
    try {
      let response = await masterService.getDifficultyLevels();
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/category/{moduleKey}:
   *   get:
   *     tags: [Master]
   *     summary: Get categoris.
   *     parameters:
   *       - in: path
   *         name: moduleKey
   *         required: true
   *         schema:
   *            type: string
   *     responses:
   *       200:
   *         description: Categoris fetched successfully.
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
   *                       categoryTitle:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No category exist.
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

  getCategories: async (req, res, next) => {
    try {
      let moduleKey = req.params.moduleKey;
      let response = await masterService.getCategories(moduleKey);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/type/{moduleKey}:
   *   get:
   *     tags: [Master]
   *     summary: Get types.
   *     parameters:
   *       - in: path
   *         name: moduleKey
   *         required: true
   *         schema:
   *            type: string
   *     responses:
   *       200:
   *         description: Types fetched successfully.
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
   *                       typeTitle:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No type exist.
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

  getTypes: async (req, res, next) => {
    try {
      let moduleKey = req.params.moduleKey;
      let response = await masterService.getTypes(moduleKey);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/uses/{moduleKey}:
   *   get:
   *     tags: [Master]
   *     summary: Get uses.
   *     parameters:
   *       - in: path
   *         name: moduleKey
   *         required: true
   *         schema:
   *            type: string
   *     responses:
   *       200:
   *         description: Uses fetched successfully.
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
   *                       usesTitle:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No uses exist.
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

  getUses: async (req, res, next) => {
    try {
      let moduleKey = req.params.moduleKey;
      let response = await masterService.getUses(moduleKey);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/origin/{moduleKey}:
   *   get:
   *     tags: [Master]
   *     summary: Get origins.
   *     parameters:
   *       - in: path
   *         name: moduleKey
   *         required: true
   *         schema:
   *            type: string
   *     responses:
   *       200:
   *         description: Origins fetched successfully.
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
   *                       originTitle:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No origin exist.
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

  getOrigins: async (req, res, next) => {
    try {
      let moduleKey = req.params.moduleKey;
      let response = await masterService.getOrigins(moduleKey);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/tag/{moduleKey}:
   *   get:
   *     tags: [Master]
   *     summary: Get tags.
   *     parameters:
   *       - in: path
   *         name: moduleKey
   *         required: true
   *         schema:
   *            type: string
   *     responses:
   *       200:
   *         description: Tags fetched successfully.
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
   *                       tagTitle:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No tag exist.
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

  getTags: async (req, res, next) => {
    try {
      let moduleKey = req.params.moduleKey;
      let response = await masterService.getTags(moduleKey);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/answerType:
   *   get:
   *     tags: [Master]
   *     summary: Get answer types.
   *     responses:
   *       200:
   *         description: Answer types fetched successfully.
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
   *                       title:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No answer types exist.
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

  getAnswerTypes: async (req, res, next) => {
    try {
      let response = await masterService.getAnswerTypes();
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/language:
   *   get:
   *     tags: [Master]
   *     summary: Get languages.
   *     responses:
   *       200:
   *         description: Languages fetched successfully.
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
   *                       language:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No languages exist.
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

  getLanguages: async (req, res, next) => {
    try {
      let response = await masterService.getLanguages();
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/allergen:
   *   get:
   *     tags: [Master]
   *     summary: Get allergens.
   *     responses:
   *       200:
   *         description: Allergens fetched successfully.
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
   *                       allergenTitle:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No allergens exist.
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

  getAllergens: async (req, res, next) => {
    try {
      let response = await masterService.getAllergens();
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/grades/{moduleKey}:
   *   get:
   *     tags: [Master]
   *     summary: Get grades.
   *     parameters:
   *       - in: path
   *         name: moduleKey
   *         required: true
   *         schema:
   *            type: string
   *     responses:
   *       200:
   *         description: Grades fetched successfully.
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
   *                       originTitle:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No grade exist.
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

  getGrades: async (req, res, next) => {
    try {
      let moduleKey = req.params.moduleKey;
      let response = await masterService.getGrades(moduleKey);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/levelTypes/{moduleKey}:
   *   get:
   *     tags: [Master]
   *     summary: Get levelTypes.
   *     parameters:
   *       - in: path
   *         name: moduleKey
   *         required: true
   *         schema:
   *            type: string
   *     responses:
   *       200:
   *         description: Level Types fetched successfully.
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
   *                       originTitle:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No level type exist.
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

  getLevelTypes: async (req, res, next) => {
    try {
      let moduleKey = req.params.moduleKey;
      let response = await masterService.getLevelTypes(moduleKey);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/learningTypes/{moduleKey}:
   *   get:
   *     tags: [Master]
   *     summary: Get learning Types.
   *     parameters:
   *       - in: path
   *         name: moduleKey
   *         required: true
   *         schema:
   *            type: string
   *     responses:
   *       200:
   *         description: Learning Types fetched successfully.
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
   *                       originTitle:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No learning type exist.
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

  getLearningTypes: async (req, res, next) => {
    try {
      let moduleKey = req.params.moduleKey;
      let response = await masterService.getLearningTypes(moduleKey);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/tag/{moduleKey}:
   *   post:
   *     tags: [Master]
   *     summary: Create tag.
   *     parameters:
   *       - in: path
   *         name: moduleKey
   *         required: true
   *         schema:
   *            type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               tagTitle:
   *                 type: string
   *               status:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Tag saved successfully.
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
   *                       title:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       created_at:
   *                         type: string
   *                       updated_at:
   *                         type: string
   *       409:
   *         description: Tag already exist.
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
  createTag: async (req, res, next) => {
    try {
      let moduleKey = req.params.moduleKey;
      let response = await masterService.createTag(
        req.body,
        req.user,
        moduleKey
      );
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/mealType:
   *   get:
   *     tags: [Master]
   *     summary: Get meal types.
   *     responses:
   *       200:
   *         description: Meal types fetched successfully.
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
   *                       title:
   *                         type: string
   *       404:
   *         description: No meal type exist.
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

  getMealTypes: async (req, res, next) => {
    try {
      let response = await masterService.getMealTypes();
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/dietAndHealth:
   *   get:
   *     tags: [Master]
   *     summary: Get diet and health.
   *     responses:
   *       200:
   *         description: Diet and health fetched successfully.
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
   *                       title:
   *                         type: string
   *       404:
   *         description: No diet and health exist.
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

  getDietAndHealth: async (req, res, next) => {
    try {
      let response = await masterService.getDietAndHealth();
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  createCategory: async (req, res, next) => {
    try {
      let moduleKey = req.params.moduleKey;
      let response = await masterService.createCategory(
        req.body,
        req.user,
        moduleKey
      );
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  createAllergen: async (req, res, next) => {
    try {
      let response = await masterService.createAllergen(req.body, req.user);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/questionType:
   *   get:
   *     tags: [Master]
   *     summary: Get question types.
   *     responses:
   *       200:
   *         description: question types fetched successfully.
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
   *                       title:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No question types exist.
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

  getQuestionTypes: async (req, res, next) => {
    try {
      let response = await masterService.getQuestionTypes(req.query);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/master/skill:
   *   get:
   *     tags: [Master]
   *     summary: Get skills.
   *     responses:
   *       200:
   *         description: Skills fetched successfully.
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
   *                       title:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No skills exist.
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

  getSkills: async (req, res, next) => {
    try {
      let response = await masterService.getSkills(req.query);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

    /**
   * @swagger
   * /api/v1/master/season:
   *   get:
   *     tags: [Master]
   *     summary: Get seasons.
   *     responses:
   *       200:
   *         description: Seasons fetched successfully.
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
   *                       title:
   *                         type: string
   *                       status:
   *                         type: boolean
   *       404:
   *         description: No skills exist.
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

     getSeasons: async (req, res, next) => {
      try {
        let response = await masterService.getSeasons(req.query);
        res.status(response.status).send(response);
      } catch (err) {
        next(err);
      }
    },
};
