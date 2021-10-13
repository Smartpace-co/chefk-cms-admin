let subscriptionPackageService = require("../service/subscriptionPackageService");

/**
 * @swagger
 *   tags:
 *     name: Subscription Package
 *     description: API to manage subscription packages.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/subscriptionPackage:
   *   post:
   *     tags: [Subscription Package]
   *     summary: Create subscription package.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                packageTitle:
   *                  type: string
   *                status:
   *                  type: boolean
   *                packageFor:
   *                  type: number
   *                validityFrom:
   *                  type: string
   *                  format: date
   *                validityTo:
   *                  type: string
   *                  format: date
   *                maxUser:
   *                  type: number
   *                price:
   *                  type: number
   *                gracePeriod:
   *                  type: number
   *                isPrivate:
   *                  type: boolean
   *                lessons:
   *                  type: array
   *                  items:
   *                    type: number
   *     responses:
   *       200:
   *         description: Subscription package saved successfully.
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
   *                       packageTitle:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       packageFor:
   *                         type: number
   *                       validity:
   *                         type: number
   *                       maxUser:
   *                         type: number
   *                       price:
   *                         type: number
   *                       gracePeriod:
   *                         type: number
   *                       isPrivate:
   *                         type: boolean
   *                       created_at:
   *                         type: string
   *                       updated_at:
   *                         type: string
   *       409:
   *         description: Subscription package name already exist.
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

  createSubscriptionPackage: async (req, res, next) => {
    try {
      let response = await subscriptionPackageService.createSubscriptionPackage(
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
   * /api/v1/subscriptionPackage:
   *   get:
   *     tags: [Subscription Package]
   *     summary: Get all subscription packages.
   *     responses:
   *       200:
   *         description: All subscription packages fetched successfully.
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
   *                        id:
   *                          type: number
   *                        packageTitle:
   *                          type: string
   *                        status:
   *                          type: boolean
   *       404:
   *         description: No subscription package exist.
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

  getAllSubscriptionPackages: async (req, res, next) => {
    try {
      let response =
        await subscriptionPackageService.getAllSubscriptionPackages(req.query);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/subscriptionPackage/{id}:
   *   get:
   *     tags: [Subscription Package]
   *     summary: Get subscription package.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: subscription package details fetched Successfully.
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
   *                        id:
   *                          type: number
   *                        packageTitle:
   *                          type: string
   *                        status:
   *                          type: boolean
   *                        packageFor:
   *                          type: number
   *                        validityFrom:
   *                          type: string
   *                          format: date
   *                        validityTo:
   *                          type: string
   *                          format: date
   *                        maxUser:
   *                          type: number
   *                        price:
   *                          type: number
   *                        gracePeriod:
   *                          type: number
   *                        isPrivate:
   *                          type: boolean
   *                        lessons:
   *                          type: array
   *                          items:
   *                            type: number
   *       404:
   *         description: No subscription package exist.
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

  getSubscriptionPackage: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await subscriptionPackageService.getsubscriptionPackage(
        id
      );
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/subscriptionPackage/{id}:
   *   put:
   *     tags: [Subscription Package]
   *     summary: Update subscription package.
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
   *                id:
   *                  type: number
   *                packageTitle:
   *                  type: string
   *                status:
   *                  type: boolean
   *                packageFor:
   *                  type: number
   *                validityFrom:
   *                  type: string
   *                  format: date
   *                validityTo:
   *                  type: string
   *                  format: date
   *                maxUser:
   *                  type: number
   *                price:
   *                  type: number
   *                gracePeriod:
   *                  type: number
   *                isPrivate:
   *                  type: boolean
   *                lessons:
   *                  type: array
   *                  items:
   *                    type: number
   *     responses:
   *       200:
   *         description: Subscription package details updated Successfully
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
   *         description: Subscription package not exist.
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
   *         description: Subscription package already exist.
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

  updateSubscriptionPackage: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await subscriptionPackageService.updatesubscriptionPackage(
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
   * /api/v1/subscriptionPackage/{id}:
   *   delete:
   *     tags: [Subscription Package]
   *     summary: Delete subscription package.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: Subscription package Details deleted Successfully.
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

  deleteSubscriptionPackage: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await subscriptionPackageService.deletesubscriptionPackage(
        id
      );
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
};
