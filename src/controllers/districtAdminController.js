let districtAdminService = require("../service/districtAdminService");

/**
 * @swagger
 *   tags:
 *     name: District Admin
 *     description: API to manage district admin accounts.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/districtAdmin:
   *   post:
   *     tags: [District Admin]
   *     summary: Create district admin.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                roleId:
   *                  type: number
   *                email:
   *                  type: string
   *                phoneNumber:
   *                  type: string
   *                name:
   *                  type: string
   *                adminAccountName:
   *                  type: string
   *                contactPersonName:
   *                  type: string
   *                contactPersonNo:
   *                  type: string
   *                contactPersonEmail:
   *                  type: string
   *                packageId:
   *                  type: number
   *                status:
   *                  type: boolean
   *     responses:
   *       200:
   *         description: District admin saved successfully.
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
   *                      id:
   *                        type: number
   *                      name:
   *                        type: string
   *                      adminAccountName:
   *                        type: string
   *                      packageId:
   *                        type: number
   *                      contactPersonName:
   *                        type: string
   *                      contactPersonNo:
   *                        type: string
   *                      contactPersonEmail:
   *                        type: string
   *                      createdBy:
   *                        type: number
   *                      userId:
   *                        type: number
   *                      updatedAt:
   *                        type: string
   *                      createdAt:
   *                        type: string
   *                      isEmailVerified:
   *                        type: boolean
   *                      isPhoneVerified:
   *                        type: boolean
   *                      roleId:
   *                        type: number
   *                      phoneNumber:
   *                        type: string
   *                      email:
   *                        type: string
   *                      status:
   *                        type: boolean
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

  createDistrictAdmin: async (req, res, next) => {
    try {
      let response = await districtAdminService.createDistrictAdmin(
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
   * /api/v1/districtAdmin:
   *   get:
   *     tags: [District Admin]
   *     summary: Get all district admin accounts.
   *     responses:
   *       200:
   *         description: All district admins fetched successfully.
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
   *                        name:
   *                          type: string
   *                        adminAccountName:
   *                          type: string
   *                        contactPersonName:
   *                          type: string
   *                        contactPersonNo:
   *                          type: string
   *                        contactPersonEmail:
   *                          type: string
   *                        user:
   *                          type: object
   *                          properties:
   *                            id:
   *                              type: number
   *                            email:
   *                              type: string
   *                            phoneNumber:
   *                              type: string
   *                            roleId:
   *                              type: number
   *                        package:
   *                          type: object
   *                          properties:
   *                            id:
   *                              type: number
   *                            packageTitle:
   *                              type: string
   *       404:
   *         description: No district admin exist.
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

  getAllDistrictAdmins: async (req, res, next) => {
    try {
      let response = await districtAdminService.getAllDistrictAdmins();
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/districtAdmin/{id}:
   *   get:
   *     tags: [District Admin]
   *     summary: Get district admin.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: District admin details fetched Successfully.
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
   *                      id:
   *                        type: number
   *                      name:
   *                        type: string
   *                      adminAccountName:
   *                        type: string
   *                      contactPersonName:
   *                        type: string
   *                      contactPersonNo:
   *                        type: string
   *                      contactPersonEmail:
   *                        type: string
   *                      user:
   *                        type: object
   *                        properties:
   *                          id:
   *                            type: number
   *                          email:
   *                            type: string
   *                          phoneNumber:
   *                            type: string
   *                          roleId:
   *                            type: number
   *                      package:
   *                        type: object
   *                        properties:
   *                          id:
   *                            type: number
   *                          packageTitle:
   *                            type: string
   *       404:
   *         description: No district admin exist.
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

  getDistrictAdmin: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await districtAdminService.getDistrictAdmin(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/districtAdmin/{id}:
   *   put:
   *     tags: [District Admin]
   *     summary: Update district admin.
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
   *                roleId:
   *                  type: number
   *                email:
   *                  type: string
   *                phoneNumber:
   *                  type: string
   *                name:
   *                  type: string
   *                adminAccountName:
   *                  type: string
   *                contactPersonName:
   *                  type: string
   *                contactPersonNo:
   *                  type: string
   *                contactPersonEmail:
   *                  type: string
   *                packageId:
   *                  type: number
   *                status:
   *                  type: boolean
   *     responses:
   *       200:
   *         description: District admin details updated Successfully
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
   *         description: District admin not exist.
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

  updateDistrictAdmin: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await districtAdminService.updateDistrictAdmin(
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
   * /api/v1/districtAdmin/{id}:
   *   delete:
   *     tags: [District Admin]
   *     summary: Delete district admin.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: District admin details deleted Successfully.
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

  deleteDistrictAdmin: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await districtAdminService.deleteDistrictAdmin(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
};
