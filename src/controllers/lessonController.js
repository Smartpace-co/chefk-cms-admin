let lessonService = require("../service/lessonService");

/**
 * @swagger
 *   tags:
 *     name: Lesson
 *     description: API to manage lessons.
 */

module.exports = {
  /**
   * @swagger
   * /api/v1/lesson:
   *   post:
   *     tags: [Lesson]
   *     summary: Create lesson.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                  lessonTitle:
   *                    type: string
   *                  status:
   *                    type: boolean
   *                  learningObjectivesForTeacher:
   *                    type: string
   *                  learningObjectivesForStudent:
   *                    type: string
   *                  greeting:
   *                    type: string
   *                  linguistic:
   *                    type: string
   *                  multiSensoryActivity:
   *                    type: string
   *                  cleanUpStep:
   *                    type: string
   *                  funFact:
   *                    type: string
   *                  socialStudiesFact:
   *                    type: string
   *                  safetyLevelId:
   *                    type: number
   *                  typeId:
   *                    type: number
   *                  gradeId:
   *                    type: number
   *                  subjectId:
   *                    type: number
   *                  size:
   *                    type: number
   *                  links:
   *                    type: array
   *                    items:
   *                      type: string
   *                  chefIntroductions:
   *                    type: array
   *                    items:
   *                      type: string
   *                  safetySteps:
   *                    type: array
   *                    items:
   *                      type: string
   *     responses:
   *       200:
   *         description: Lesson saved successfully.
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
   *                      definitions:
   *                      id:
   *                        type: number
   *                      lessonTitle:
   *                        type: string
   *                      status:
   *                        type: boolean
   *                      learningObjectivesForTeacher:
   *                        type: string
   *                      learningObjectivesForStudent:
   *                        type: string
   *                      greeting:
   *                        type: string
   *                      linguistic:
   *                        type: string
   *                      multiSensoryActivity:
   *                        type: string
   *                      cleanUpStep:
   *                        type: string
   *                      funFact:
   *                        type: string
   *                      socialStudiesFact:
   *                        type: string
   *                      safetyLevelId:
   *                        type: number
   *                      typeId:
   *                        type: number
   *                      gradeId:
   *                        type: number
   *                      subjectId:
   *                        type: number
   *                      createdBy:
   *                        type: number
   *                      creatorId:
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
   *       409:
   *         description: Lesson name already exist.
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

  createLesson: async (req, res, next) => {
    try {
      let response = await lessonService.createLesson(req.body, req.user);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/lesson:
   *   get:
   *     tags: [Lesson]
   *     summary: Get all lessons.
   *     responses:
   *       200:
   *         description: All lessons fetched successfully.
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
   *                          id:
   *                            type: number
   *                          lessonTitle:
   *                            type: string
   *                          status:
   *                            type: boolean
   *                          user:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              name:
   *                                type: string
   *                          grade:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              grade:
   *                                type: string
   *                          activity:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              activityTitle:
   *                                type: string
   *                          recipe:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              recipeTitle:
   *                                type: string
   *                          experiment:
   *                            type: object
   *                            properties:
   *                              id:
   *                                type: number
   *                              experimentTitle:
   *                                type: string
   *       404:
   *         description: No lesson exist.
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

  getAllLessons: async (req, res, next) => {
    try {
      let response = await lessonService.getAllLessons(req.query);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/lesson/{id}:
   *   get:
   *     tags: [Lesson]
   *     summary: Get lesson.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: lesson details fetched successfully.
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
   *                       lessonTitle:
   *                         type: string
   *                       status:
   *                         type: boolean
   *                       learningObjectivesForTeacher:
   *                         type: string
   *                       learningObjectivesForStudent:
   *                         type: string
   *                       greeting:
   *                         type: string
   *                       linguistic:
   *                         type: string
   *                       multiSensoryActivity:
   *                         type: string
   *                       cleanUpStep:
   *                         type: string
   *                       funFact:
   *                         type: string
   *                       socialStudiesFact:
   *                         type: string
   *                       isFeatured:
   *                         type: boolean
   *                       user:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           name:
   *                             type: string
   *                       links:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             id:
   *                               type: number
   *                             link:
   *                               type: string
   *                       type:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           typeTitle:
   *                             type: string
   *                       safetyLevel:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           safetyLevelTitle:
   *                             type: string
   *                       subject:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           subjectTitle:
   *                             type: string
   *                       grade:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           grade:
   *                             type: string
   *                       safetySteps:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             id:
   *                               type: number
   *                             text:
   *                               type: string
   *                       chefIntroductions:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             id:
   *                               type: number
   *                             text:
   *                               type: string
   *                       mealType:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             id:
   *                               type: number
   *                             title:
   *                               type: string
   *                       dietAndHealth:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             id:
   *                               type: number
   *                             title:
   *                               type: string
   *                       language:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             id:
   *                               type: number
   *                             text:
   *                               language: string
   *                       activity:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           activityTitle:
   *                             type: string
   *                           image:
   *                             type: string
   *                           link:
   *                             type: string
   *                           descriptionEasy:
   *                             type: string
   *                           descriptionMedium:
   *                             type: string
   *                           descriptionHard:
   *                             type: string
   *                           activityQuestions:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 id:
   *                                   type: number
   *                                 question:
   *                                   type: string
   *                                 hint:
   *                                   type: string
   *                                 image:
   *                                   type: string
   *                                   format: nullable
   *                                 descriptionEasy:
   *                                   type: string
   *                                 descriptionMedium:
   *                                   type: string
   *                                 descriptionHard:
   *                                   type: string
   *                                 standards:
   *                                   type: array
   *                                   items:
   *                                     type: object
   *                                     properties:
   *                                       standardId:
   *                                         type: number
   *                                       standard:
   *                                         type: object
   *                                         properties:
   *                                           id:
   *                                             type: number
   *                                           standardTitle:
   *                                             type: string
   *                       experiment:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           experimentTitle:
   *                             type: string
   *                           descriptionEasy:
   *                             type: string
   *                           descriptionMedium:
   *                             type: string
   *                           descriptionHard:
   *                             type: string
   *                           experimentTools:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 toolId:
   *                                   type: number
   *                                 tool:
   *                                    type: object
   *                                    properties:
   *                                        id:
   *                                          type: number
   *                                        toolTitle:
   *                                          type: string
   *                           experimentIngredients:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 ingredientId:
   *                                   type: number
   *                                 ingredient:
   *                                    type: object
   *                                    properties:
   *                                        id:
   *                                          type: number
   *                                        ingredientTitle:
   *                                          type: string
   *                           experimentTechniques:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 culinaryTechniqueId:
   *                                   type: number
   *                                 culinaryTechnique:
   *                                    type: object
   *                                    properties:
   *                                        id:
   *                                          type: number
   *                                        culinaryTechniqueTitle:
   *                                          type: string
   *                           experimentSteps:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 id:
   *                                   type: number
   *                                 text:
   *                                   type: string
   *                                 link:
   *                                   type: string
   *                           experimentQuestions:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 id:
   *                                   type: number
   *                                 question:
   *                                   type: string
   *                                 hint:
   *                                   type: string
   *                                   format: nullable
   *                                 image:
   *                                   type: string
   *                                   format: nullable
   *                                 descriptionEasy:
   *                                   type: string
   *                                   format: nullable
   *                                 descriptionMedium:
   *                                   type: string
   *                                   format: nullable
   *                                 descriptionHard:
   *                                   type: string
   *                                   format: nullable
   *                                 answers:
   *                                   type: array
   *                                   items:
   *                                     type: object
   *                                     properties:
   *                                       id:
   *                                         type: number
   *                                       option:
   *                                         type: string
   *                                       image:
   *                                         type: string
   *                                       isAnswer:
   *                                         type: boolean
   *                                 standards:
   *                                    type: array
   *                                    items:
   *                                      type: object
   *                                      properties:
   *                                        standardId:
   *                                          type: number
   *                                        standard:
   *                                          type: object
   *                                          properties:
   *                                            id:
   *                                              type: number
   *                                            standardTitle:
   *                                              type: string
   *                       recipe:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: number
   *                           recipeTitle:
   *                             type: string
   *                           holiday:
   *                             type: string
   *                             format: nullable
   *                           estimatedMakeTime:
   *                             type: number
   *                           serves:
   *                             type: number
   *                           descriptionEasy:
   *                             type: string
   *                           descriptionMedium:
   *                             type: string
   *                           descriptionHard:
   *                             type: string
   *                           recipeIngredients:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 id:
   *                                   type: number
   *                                 ingredientId:
   *                                   type: number
   *                                 ingredient:
   *                                    type: object
   *                                    properties:
   *                                        id:
   *                                          type: number
   *                                        ingredientTitle:
   *                                          type: string
   *                                 unitOfMeasurementId:
   *                                   type: number
   *                                 unitOfMeasurement:
   *                                    type: object
   *                                    properties:
   *                                        id:
   *                                          type: number
   *                                        unitOfMeasure:
   *                                          type: string
   *                                 quantity:
   *                                   type: number
   *                                 image:
   *                                   type: string
   *                                 quickBlurbText:
   *                                   type: string
   *                                 quickBlurbImage:
   *                                   type: string
   *                           recipeTechniques:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 id:
   *                                   type: number
   *                                 culinaryTechniqueId:
   *                                   type: number
   *                                 culinaryTechnique:
   *                                    type: object
   *                                    properties:
   *                                        id:
   *                                          type: number
   *                                        culinaryTechniqueTitle:
   *                                          type: string
   *                                 dialogue:
   *                                   type: string
   *                                 animationLink:
   *                                   type: string
   *                           bigChefTools:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 toolId:
   *                                   type: number
   *                                 tool:
   *                                    type: object
   *                                    properties:
   *                                        id:
   *                                          type: number
   *                                        toolTitle:
   *                                          type: string
   *                           littleChefTools:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 toolId:
   *                                   type: number
   *                                 tool:
   *                                    type: object
   *                                    properties:
   *                                        id:
   *                                          type: number
   *                                        toolTitle:
   *                                          type: string
   *                           preparationSteps:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 id:
   *                                   type: number
   *                                 text:
   *                                   type: string
   *                                 image:
   *                                   type: string
   *                                 link:
   *                                   type: string
   *                                   format: nullable
   *                                 estimatedTime:
   *                                   type: number
   *                                 isApplicableForBigChef:
   *                                   type: boolean
   *                                 isApplicableForLittleChef:
   *                                   type: boolean
   *                           cookingSteps:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 id:
   *                                   type: number
   *                                 text:
   *                                   type: string
   *                                 image:
   *                                   type: string
   *                                 link:
   *                                   type: string
   *                                   format: nullable
   *                                 estimatedTime:
   *                                   type: number
   *                                 isApplicableForBigChef:
   *                                   type: boolean
   *                                 isApplicableForLittleChef:
   *                                   type: boolean
   *                           servingSteps:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 id:
   *                                   type: number
   *                                 text:
   *                                   type: string
   *                                 image:
   *                                   type: string
   *                                 link:
   *                                   type: string
   *                                   format: nullable
   *                                 descriptionEasy:
   *                                   type: string
   *                                 descriptionMedium:
   *                                   type: string
   *                                 descriptionHard:
   *                                   type: string
   *                       questions:
   *                         type: array
   *                         items:
   *                           type: object
   *                           properties:
   *                             id:
   *                               type: number
   *                             questionTypeId:
   *                               type: number
   *                             question:
   *                               type: string
   *                             hint:
   *                               type: string
   *                             image:
   *                               type: string
   *                               format: nullable
   *                             descriptionEasy:
   *                               type: string
   *                             descriptionMedium:
   *                               type: string
   *                             descriptionHard:
   *                               type: string
   *                             answers:
   *                               type: array
   *                               items:
   *                                 type: object
   *                                 properties:
   *                                   id:
   *                                     type: number
   *                                   option:
   *                                     type: string
   *                                   image:
   *                                     type: string
   *                                   isAnswer:
   *                                     type: boolean
   *                             standards:
   *                               type: array
   *                               items:
   *                                 type: object
   *                                 properties:
   *                                   standardId:
   *                                     type: number
   *                                   standard:
   *                                     type: object
   *                                     properties:
   *                                       id:
   *                                         type: number
   *                                       standardTitle:
   *                                         type: string
   *       404:
   *         description: No lesson exist.
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

  getLesson: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await lessonService.getLesson(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/lesson/{id}:
   *   put:
   *     tags: [Lesson]
   *     summary: Update lesson.
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
   *                lessonTitle:
   *                  type: string
   *                status:
   *                  type: boolean
   *                learningObjectivesForTeacher:
   *                  type: string
   *                learningObjectivesForStudent:
   *                  type: string
   *                greeting:
   *                  type: string
   *                linguistic:
   *                  type: string
   *                multiSensoryActivity:
   *                  type: string
   *                cleanUpStep:
   *                  type: string
   *                funFact:
   *                  type: string
   *                socialStudiesFact:
   *                  type: string
   *                safetyLevelId:
   *                  type: number
   *                typeId:
   *                  type: number
   *                gradeId:
   *                  type: number
   *                subjectId:
   *                  type: number
   *                size:
   *                  type: number
   *                isFeatured:
   *                  type: boolean
   *                mealTypeId:
   *                  type: number
   *                dietAndHealthId:
   *                  type: number
   *                languageId:
   *                  type: number
   *                links:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id:
   *                        type: number
   *                      videoLink:
   *                        type: string
   *                chefIntroductions:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id:
   *                        type: number
   *                      text:
   *                        type: string
   *                safetySteps:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id:
   *                        type: number
   *                      text:
   *                        type: string
   *                recipe:
   *                  type: object
   *                  properties:
   *                    recipeTitle:
   *                      type: string
   *                    holidays:
   *                      type: string
   *                    estimatedMakeTime:
   *                      type: number
   *                    serves:
   *                      type: number
   *                    descriptionEasy:
   *                      type: string
   *                    descriptionMedium:
   *                      type: string
   *                    descriptionHard:
   *                      type: string
   *                    bigChefTools:
   *                      type: array
   *                      items:
   *                        type: number
   *                    littleChefTools:
   *                      type: array
   *                      items:
   *                        type: number
   *                    recipeIngredients:
   *                      type: array
   *                      items:
   *                        type: object
   *                        properties:
   *                          ingredientId:
   *                            type: number
   *                          unitOfMeasurementId:
   *                            type: number
   *                          quantity:
   *                            type: number
   *                          image:
   *                            type: string
   *                          quickBlurbText:
   *                            type: string
   *                          quickBlurbImage:
   *                            type: string
   *                    recipeTechniques:
   *                      type: array
   *                      items:
   *                        type: object
   *                        properties:
   *                          culinaryTechniqueId:
   *                            type: number
   *                          dialogue:
   *                            type: string
   *                          animationLink:
   *                            type: string
   *                    preparationSteps:
   *                      type: array
   *                      items:
   *                        type: object
   *                        properties:
   *                          text:
   *                            type: string
   *                          image:
   *                            type: string
   *                          estimatedTime:
   *                            type: number
   *                          isApplicableForBigChef:
   *                            type: boolean
   *                          isApplicableForLittleChef:
   *                            type: boolean
   *                    cookingSteps:
   *                      type: array
   *                      items:
   *                        type: object
   *                        properties:
   *                          text:
   *                            type: string
   *                          image:
   *                            type: string
   *                          estimatedTime:
   *                            type: number
   *                          isApplicableForBigChef:
   *                            type: boolean
   *                          isApplicableForLittleChef:
   *                            type: boolean
   *                    servingSteps:
   *                      type: array
   *                      items:
   *                        type: object
   *                        properties:
   *                          text:
   *                            type: string
   *                          image:
   *                            type: string
   *                          descriptionEasy:
   *                            type: string
   *                          descriptionMedium:
   *                            type: string
   *                          descriptionHard:
   *                            type: string
   *                experiment:
   *                  type: object
   *                  properties:
   *                    experimentTitle:
   *                      type: string
   *                    descriptionEasy:
   *                      type: string
   *                    descriptionMedium:
   *                      type: string
   *                    descriptionHard:
   *                      type: string
   *                    experimentIngredients:
   *                      type: array
   *                      items:
   *                        type: number
   *                    experimentTools:
   *                      type: array
   *                      items:
   *                        type: number
   *                    experimentTechniques:
   *                      type: array
   *                      items:
   *                        type: number
   *                    experimentSteps:
   *                      type: array
   *                      items:
   *                        type: object
   *                        properties:
   *                          id:
   *                            type: number
   *                          text:
   *                            type: string
   *                          link:
   *                            type: string
   *                    experimentQuestions:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           answerTypeId:
   *                             type: number
   *                           question:
   *                             type: string
   *                           hint:
   *                             type: string
   *                           descriptionEasy:
   *                             type: string
   *                           descriptionMedium:
   *                             type: string
   *                           descriptionHard:
   *                             type: string
   *                           standards:
   *                             type: array
   *                             items:
   *                               type: number
   *                           answers:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 option:
   *                                   type: string
   *                                 isAnswer:
   *                                   type: boolean
   *                activity:
   *                  type: object
   *                  properties:
   *                    activityTitle:
   *                      type: string
   *                    image:
   *                      type: string
   *                    link:
   *                      type: string
   *                    descriptionEasy:
   *                      type: string
   *                    descriptionMedium:
   *                      type: string
   *                    descriptionHard:
   *                      type: string
   *                    activityQuestions:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           answerTypeId:
   *                             type: number
   *                           question:
   *                             type: string
   *                           hint:
   *                             type: string
   *                           descriptionEasy:
   *                             type: string
   *                           descriptionMedium:
   *                             type: string
   *                           descriptionHard:
   *                             type: string
   *                           standards:
   *                             type: array
   *                             items:
   *                               type: number
   *                           answers:
   *                             type: array
   *                             items:
   *                               type: object
   *                               properties:
   *                                 option:
   *                                   type: string
   *                                 isAnswer:
   *                                   type: boolean
   *                questions:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      id:
   *                        type: number
   *                      questionTypeId:
   *                        type: number
   *                      answerTypeId:
   *                        type: number
   *                      question:
   *                        type: string
   *                      hint:
   *                        type: string
   *                      descriptionEasy:
   *                        type: string
   *                      descriptionMedium:
   *                        type: string
   *                      descriptionHard:
   *                        type: string
   *                      standards:
   *                        type: array
   *                        items:
   *                          type: number
   *                      answers:
   *                        type: array
   *                        items:
   *                          type: object
   *                          properties:
   *                            option:
   *                              type: string
   *                            isAnswer:
   *                              type: boolean
   *     responses:
   *       200:
   *         description: Lesson details updated Successfully
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
   *         description: Lesson not exist.
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
   *         description: Lesson already exist.
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

  updateLesson: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await lessonService.updateLesson(req.body, req.user, id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/lesson/{id}:
   *   delete:
   *     tags: [Lesson]
   *     summary: Delete lesson.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *            type: number
   *     responses:
   *       200:
   *         description: Lesson details deleted Successfully.
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

  deleteLesson: async (req, res, next) => {
    try {
      let id = req.params.id;
      let response = await lessonService.deleteLesson(id);
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/v1/lesson/file:
   *   post:
   *     tags: [Lesson]
   *     summary: Upload lesson.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                fileName:
   *                  type: string
   *     responses:
   *       200:
   *         description: Lesson details saved Successfully
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
   *                      definitions:
   *                      success:
   *                        type: number
   *                      faliure:
   *                        type: number
   *                      conflict:
   *                        type: number
   *       404:
   *         description: Lesson not exist.
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
  createLessonFromFile: async (req, res, next) => {
    try {
      let response = await lessonService.createLessonFromFile(
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
   * /api/v1/lesson:
   *   get:
   *     tags: [Lesson]
   *     summary: Get lessons count by grade.
   *     responses:
   *       200:
   *         description: All lessons fetched successfully.
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
   *                          id:
   *                            type: number
   *                          grade:
   *                            type: string
   *                          lessonCount:
   *                            type: number
   *       404:
   *         description: No lesson exist.
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
  getAllLessonsGroupByGrades: async (req, res, next) => {
    try {
      let response = await lessonService.getAllLessonsGroupByGrades();
      res.status(response.status).send(response);
    } catch (err) {
      next(err);
    }
  },
};
