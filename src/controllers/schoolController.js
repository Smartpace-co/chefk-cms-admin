let schoolService = require("../service/schoolService");

/**
 * @swagger
 *   tags:
 *     name: School
 *     description: API to manage schools.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/school:
   *   post:
   *     tags: [School]
   *     summary: Create school.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                roleId:
   *                  type: number
   *                districtId:
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
   *                contactPersonNumber:
   *                  type: string
   *                contactPersonEmail:
   *                  type: string
   *                packageId:
   *                  type: number
   *                status:
   *                  type: boolean
   *     responses:
   *       200:
   *         description: School saved successfully.
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
   *                      districtId:
   *                        type: number
   *                      name:
   *                        type: string
   *                      adminAccountName:
   *                        type: string
   *                      packageId:
   *                        type: number
   *                      contactPersonName:
   *                        type: string
   *                      contactPersonNumber:
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

  createSchool: async (req, res, next) => {
    try {
      let response = await schoolService.createSchool(req.body, req.user);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/school:
   *   get:
   *     tags: [School]
   *     summary: Get all schools.
   *     responses:
   *       200:
   *         description: All schools fetched successfully.
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
   *                        contactPersonNumber:
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
   *                        district:
   *                          type: object
   *                          properties:
   *                            id:
   *                              type: number
   *                            name:
   *                              type: string
   *       404:
   *         description: No school admin exist.
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

  getAllSchools: async (req, res, next) => {
    try {
      let response = await schoolService.getAllSchools();
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/school/{id}:
   *   get:
   *     tags: [School]
   *     summary: Get school.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: School details fetched Successfully.
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
   *                      contactPersonNumber:
   *                        type: string
   *                      contactPersonEmail:
   *                        type: string
   *                      packageId:
   *                        type: number
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
   *                      district:
   *                        type: object
   *                        properties:
   *                          id:
   *                            type: number
   *                          name:
   *                            type: string
   *       404:
   *         description: No school exist.
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

  getSchool: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await schoolService.getSchool(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/school/{id}:
   *   put:
   *     tags: [School]
   *     summary: Update school.
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
   *                districtId:
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
   *                contactPersonNumber:
   *                  type: string
   *                contactPersonEmail:
   *                  type: string
   *                packageId:
   *                  type: number
   *                status:
   *                  type: boolean
   *     responses:
   *       200:
   *         description: School details updated Successfully
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
   *         description: School not exist.
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

  updateSchool: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await schoolService.updateSchool(req.body, req.user, id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/school/{id}:
   *   delete:
   *     tags: [School]
   *     summary: Delete school.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: School details deleted Successfully.
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

  deleteSchool: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await schoolService.deleteSchool(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
};
