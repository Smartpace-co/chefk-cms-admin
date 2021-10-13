let subjectService = require("../service/subjectService");

/**
 * @swagger
 *   tags:
 *     name: Subject
 *     description: API to manage subjects.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/subject:
   *   post:
   *     tags: [Subject]
   *     summary: Create subject.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               subjectTitle:
   *                 type: string
   *               description:
   *                 type: string
   *               status:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Subject saved successfully.
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
   *                       subjectTitle:
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

  createSubject: async (req, res, next) => {
    try {
      let response = await subjectService.createSubject(req.body, req.user);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/subject:
   *   get:
   *     tags: [Subject]
   *     summary: Get all subjects.
   *     responses:
   *       200:
   *         description: All subjects fetched successfully.
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
   *                       subjectTitle:
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
   *         description: No subject exist.
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

  getAllSubjects: async (req, res, next) => {
    try {
      let response = await subjectService.getAllSubjects(req.query);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/subject/{id}:
   *   get:
   *     tags: [Subject]
   *     summary: Get subjects.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: subject details fetched Successfully.
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
   *                       subjectTitle:
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
   *         description: No subject exist.
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

  getSubject: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await subjectService.getSubject(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/subject/{id}:
   *   put:
   *     tags: [Subject]
   *     summary: Update subject.
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
   *               subjectTitle:
   *                 type: string
   *               description:
   *                 type: string
   *               status:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Subject details updated Successfully.
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
   *                       subjectTitle:
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
   *         description: No subject exist.
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

  updateSubject: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await subjectService.updateSubject(req.body, req.user, id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/subject/{id}:
   *   delete:
   *     tags: [Subject]
   *     summary: Delete subject.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: Subject Details deleted Successfully.
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

  deleteSubject: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await subjectService.deleteSubject(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
};
