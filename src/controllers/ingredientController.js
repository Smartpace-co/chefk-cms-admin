let ingredientService = require("../service/ingredientService");

/**
 * @swagger
 *   tags:
 *     name: Ingredient
 *     description: API to manage ingredients.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/ingredient:
   *   post:
   *     tags: [Ingredient]
   *     summary: Create ingredient.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               ingredientTitle:
   *                 type: string
   *               status:
   *                 type: boolean
   *               languageId:
   *                 type: number
   *               typeId:
   *                 type: number
   *               tags:
   *                type: array
   *                items:
   *                 type: number
   *               allergens:
   *                type: array
   *                items:
   *                 type: number
   *               easyOrdering:
   *                 type: string
   *               size:
   *                 type: number
   *               scientificName:
   *                 type: string
   *               commonName:
   *                 type: string
   *               spotlightVideo:
   *                 type: string
   *               images:
   *                 type: array
   *                 items:
   *                    type: string
   *               scienceFacts:
   *                 type: array
   *                 items:
   *                   type: string
   *               substitutes:
   *                 type: array
   *                 items:
   *                   type: number
   *               additionalNutrients:
   *                 type: array
   *                 items:
   *                   type: number
   *               spotlightQuestions:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     answerTypeId:
   *                       type: number
   *                     question:
   *                       type: string
   *                     answers:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           option:
   *                             type: string
   *                           isAnswer:
   *                             type: boolean
   *               multiSensoryQuestions:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     answerTypeId:
   *                       type: number
   *                     question:
   *                       type: string
   *                     answers:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           option:
   *                             type: string
   *                           isAnswer:
   *                             type: boolean
   *     responses:
   *       200:
   *         description: Ingredient saved successfully.
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
   *                      ingredientTitle:
   *                        type: string
   *                      status:
   *                        type: boolean
   *                      languageId:
   *                        type: number
   *                      typeId:
   *                        type: number
   *                      tagId:
   *                        type: number
   *                      allergenId:
   *                        type: number
   *                      easyOrdering:
   *                        type: string
   *                      size:
   *                        type: number
   *                      scientificName:
   *                        type: string
   *                      commonName:
   *                        type: string
   *                      spotlightVideo:
   *                        type: string
   *                      createdBy:
   *                        type: number
   *                      updatedAt:
   *                        type: string
   *                      createdAt:
   *                        type: string
   *                      scienceFacts:
   *                        type: array
   *                        items:
   *                          type: object
   *                          properties:
   *                            id:
   *                              type: number
   *                            fact:
   *                              type: string
   *                      spotlightQuestions:
   *                        type: array
   *                        items:
   *                          type: object
   *                          properties:
   *                            id:
   *                              type: number
   *                            question:
   *                              type: string
   *                            questionTypeId:
   *                              type: number
   *                            answerTypeId:
   *                              type: number
   *                            answers:
   *                              type: array
   *                              items:
   *                                type: object
   *                                properties:
   *                                  id:
   *                                    type: number
   *                                  option:
   *                                    type: string
   *                                  image:
   *                                    type: string
   *                                  isAnswer:
   *                                    type: boolean
   *                      multiSensoryQuestions:
   *                        type: array
   *                        items:
   *                          type: object
   *                          properties:
   *                            id:
   *                              type: number
   *                            question:
   *                              type: string
   *                            questionTypeId:
   *                              type: number
   *                            answerTypeId:
   *                              type: number
   *                            answers:
   *                              type: array
   *                              items:
   *                                type: object
   *                                properties:
   *                                  id:
   *                                    type: number
   *                                  option:
   *                                    type: string
   *                                  image:
   *                                    type: string
   *                                  isAnswer:
   *                                    type: boolean
   *                      images:
   *                        type: array
   *                        items:
   *                          type: string
   *       409:
   *         description: Ingredient name already exist.
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

  createIngredient: async (req, res, next) => {
    try {
      let response = await ingredientService.createIngredient(
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
   * /api/v1/ingredient:
   *   get:
   *     tags: [Ingredient]
   *     summary: Get all ingredients.
   *     responses:
   *       200:
   *         description: All ingredients fetched successfully.
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
   *                        ingredientTitle:
   *                          type: string
   *                        easyOrdering:
   *                          type: string
   *                        size:
   *                          type: number
   *                        scientificName:
   *                          type: string
   *                        commonName:
   *                          type: string
   *                        spotlightVideo:
   *                          type: string
   *                        status:
   *                          type: boolean
   *                        type:
   *                          type: object
   *                          properties:
   *                            id:
   *                              type: number
   *                            typeTitle:
   *                              type: string
   *                        tags:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              tag:
   *                                type: object
   *                                properties:
   *                                  id:
   *                                    type: number
   *                                  tagTitle:
   *                                    type: string
   *                        allergens:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              allergen:
   *                                type: object
   *                                properties:
   *                                  id:
   *                                    type: number
   *                                  allergenTitle:
   *                                    type: string
   *                        language:
   *                          type: object
   *                          properties:
   *                            id:
   *                              type: number
   *                            language:
   *                              type: string
   *                        science_facts:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              fact:
   *                                type: string
   *                        images:
   *                          type: array
   *                          items:
   *                             type: string
   *                        additionalNutrients:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              nutrient:
   *                                type: object
   *                                properties:
   *                                  id:
   *                                    type: number
   *                                  nutrientTitle:
   *                                    type: string
   *                        substitutes:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              ingredient:
   *                                type: object
   *                                properties:
   *                                  id:
   *                                    type: number
   *                                  ingredientTitle:
   *                                    type: string
   *                        spotlightQuestions:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              question:
   *                                type: string
   *                              answers:
   *                                type: array
   *                                items:
   *                                  type: object
   *                                  properties:
   *                                    id:
   *                                      type: number
   *                                    option:
   *                                      type: string
   *                                    image:
   *                                      type: string
   *                                    isAnswer:
   *                                      type: boolean
   *                        multiSensoryQuestions:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              question:
   *                                type: string
   *                              answers:
   *                                type: array
   *                                items:
   *                                  type: object
   *                                  properties:
   *                                    id:
   *                                      type: number
   *                                    option:
   *                                      type: string
   *                                    image:
   *                                      type: string
   *                                    isAnswer:
   *                                      type: boolean
   *
   *       404:
   *         description: No ingredient exist.
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

  getAllIngredients: async (req, res, next) => {
    try {
      let response = await ingredientService.getAllIngredients(req.query);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/ingredient/{id}:
   *   get:
   *     tags: [Ingredient]
   *     summary: Get ingredient.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: ingredient details fetched Successfully.
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
   *                        ingredientTitle:
   *                          type: string
   *                        easyOrdering:
   *                          type: string
   *                        size:
   *                          type: number
   *                        scientificName:
   *                          type: string
   *                        commonName:
   *                          type: string
   *                        spotlightVideo:
   *                          type: string
   *                        status:
   *                          type: boolean
   *                        type:
   *                          type: object
   *                          properties:
   *                            id:
   *                              type: number
   *                            typeTitle:
   *                              type: string
   *                        tags:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              tag:
   *                                type: object
   *                                properties:
   *                                  id:
   *                                    type: number
   *                                  tagTitle:
   *                                    type: string
   *                        allergens:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              allergen:
   *                                type: object
   *                                properties:
   *                                  id:
   *                                    type: number
   *                                  allergenTitle:
   *                                    type: string
   *                        language:
   *                          type: object
   *                          properties:
   *                            id:
   *                              type: number
   *                            language:
   *                              type: string
   *                        science_facts:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              fact:
   *                                type: string
   *                        images:
   *                          type: array
   *                          items:
   *                             type: string
   *                        additionalNutrients:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              nutrient:
   *                                type: object
   *                                properties:
   *                                  id:
   *                                    type: number
   *                                  nutrientTitle:
   *                                    type: string
   *                        substitutes:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              ingredient:
   *                                type: object
   *                                properties:
   *                                  id:
   *                                    type: number
   *                                  ingredientTitle:
   *                                    type: string
   *                        spotlightQuestions:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              question:
   *                                type: string
   *                              answers:
   *                                type: array
   *                                items:
   *                                  type: object
   *                                  properties:
   *                                    id:
   *                                      type: number
   *                                    option:
   *                                      type: string
   *                                    image:
   *                                      type: string
   *                                    isAnswer:
   *                                      type: boolean
   *                        multiSensoryQuestions:
   *                          type: array
   *                          items:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              question:
   *                                type: string
   *                              answers:
   *                                type: array
   *                                items:
   *                                  type: object
   *                                  properties:
   *                                    id:
   *                                      type: number
   *                                    option:
   *                                      type: string
   *                                    image:
   *                                      type: string
   *                                    isAnswer:
   *                                      type: boolean
   *       404:
   *         description: No ingredient exist.
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

  getIngredient: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await ingredientService.getIngredient(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/ingredient/{id}:
   *   put:
   *     tags: [Ingredient]
   *     summary: Update ingredient.
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
   *                ingredientTitle:
   *                  type: string
   *                status:
   *                  type: boolean
   *                languageId:
   *                  type: number
   *                typeId:
   *                  type: number
   *                tags:
   *                 type: array
   *                 items:
   *                  type: number
   *                allergens:
   *                 type: array
   *                 items:
   *                  type: number
   *                easyOrdering:
   *                  type: string
   *                size:
   *                  type: number
   *                scientificName:
   *                  type: string
   *                commonName:
   *                  type: string
   *                spotlightVideo:
   *                  type: string
   *                createdBy:
   *                  type: number
   *                updatedAt:
   *                  type: string
   *                createdAt:
   *                  type: string
   *                scienceFacts:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id:
   *                        type: number
   *                      fact:
   *                        type: string
   *                spotlightQuestions:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id:
   *                        type: number
   *                      question:
   *                        type: string
   *                      questionTypeId:
   *                        type: number
   *                      answerTypeId:
   *                        type: number
   *                      answers:
   *                        type: array
   *                        items:
   *                          type: object
   *                          properties:
   *                            id:
   *                              type: number
   *                            option:
   *                              type: string
   *                            image:
   *                              type: string
   *                            isAnswer:
   *                              type: boolean
   *                multiSensoryQuestions:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id:
   *                        type: number
   *                      question:
   *                        type: string
   *                      questionTypeId:
   *                        type: number
   *                      answerTypeId:
   *                        type: number
   *                      answers:
   *                        type: array
   *                        items:
   *                          type: object
   *                          properties:
   *                            id:
   *                              type: number
   *                            option:
   *                              type: string
   *                            image:
   *                              type: string
   *                            isAnswer:
   *                              type: boolean
   *                images:
   *                  type: array
   *                  items:
   *                    type: string
   *     responses:
   *       200:
   *         description: Ingredient details updated Successfully
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
   *         description: Ingredient not exist.
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
   *         description: Ingredient already exist.
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

  updateIngredient: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await ingredientService.updateIngredient(
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
   * /api/v1/ingredient/{id}:
   *   delete:
   *     tags: [Ingredient]
   *     summary: Delete ingredient.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: Ingredient details deleted Successfully.
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

  deleteIngredient: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await ingredientService.deleteIngredient(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
};
