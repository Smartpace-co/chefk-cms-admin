let userService = require("../service/userService");

/**
 * @swagger
 *   tags:
 *     name: User
 *     description: API to manage users.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/user:
   *   post:
   *     tags: [User]
   *     summary: Create user.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               roleId:
   *                 type: number
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               phoneNumber:
   *                 type: number
   *               status:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: User saved successfully.
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
   *                       roleId:
   *                         type: number
   *                       name:
   *                         type: string
   *                       email:
   *                         type: string
   *                       phoneNumber:
   *                         type: number
   *                       status:
   *                         type: boolean
   *       404:
   *         description: Role not exist.
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
   *         description: Email already exist.
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

  createUser: async (req, res, next) => {
    try {
      let response = await userService.createUser(req.body, req.user);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/user:
   *   get:
   *     tags: [User]
   *     summary: Get all users.
   *     responses:
   *       200:
   *         description: All users fetched successfully.
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
   *                       roleId:
   *                         type: number
   *                       name:
   *                         type: string
   *                       email:
   *                         type: string
   *                       phoneNumber:
   *                         type: number
   *                       status:
   *                         type: boolean
   *                       role:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           title:
   *                             type: string
   *       404:
   *         description: No user exist.
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

  getAllUsers: async (req, res, next) => {
    try {
      let response = await userService.getAllUsers(req.user);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/user/{id}:
   *   get:
   *     tags: [User]
   *     summary: Get user.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: User details fetched Successfully.
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
   *                     roleId:
   *                       type: number
   *                     name:
   *                       type: string
   *                     email:
   *                       type: string
   *                     phoneNumber:
   *                       type: number
   *                     status:
   *                       type: boolean
   *                     role:
   *                       type: object
   *                       properties:
   *                         id:
   *                           type: number
   *                         title:
   *                           type: string
   *       404:
   *         description: No user exist.
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

  getUser: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await userService.getUser(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/user/{id}:
   *   put:
   *     tags: [User]
   *     summary: Update user.
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
   *               roleId:
   *                 type: number
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               phoneNumber:
   *                 type: number
   *               status:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: User details updated Successfully
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
   *         description: Role not exist.
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
   *         description: Email already exist.
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

  updateUser: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await userService.updateUser(req.body, req.user, id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/user/{id}:
   *   delete:
   *     tags: [User]
   *     summary: Delete user.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: User details deleted successfully.
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

  deleteUser: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await userService.deleteUser(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
};
