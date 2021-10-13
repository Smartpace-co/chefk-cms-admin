const express = require("express");
const router = express.Router();

// Middlewares
const authenticateToken = require("./middleware/authenticateToken");

// Controllers
const authController = require("./controllers/authController");
const roleController = require("./controllers/roleController");
const subjectController = require("./controllers/subjectController");
const standardController = require("./controllers/standardController");
const unitOfMeasurementController = require("./controllers/unitOfMeasurementController");
const toolController = require("./controllers/toolController");
const masterController = require("./controllers/masterController");
const commonController = require("./controllers/commonController");
const culinaryTechniqueController = require("./controllers/culinaryTechniqueController");
const nutrientController = require("./controllers/nutrientController");
const ingredientController = require("./controllers/ingredientController");
const countryController = require("./controllers/countryController");
const stampController = require("./controllers/stampController");
const lessonController = require("./controllers/lessonController");
const subscriptionPackageController = require("./controllers/subscriptionPackageController");
const districtAdminController = require("./controllers/districtAdminController");
const userController = require("./controllers/userController");
const schoolController = require("./controllers/schoolController");
const conversationSentenceController=require("./controllers/conversationSentenceController");
const healthHygieneController=require("./controllers/healthHygieneController");
const imageDragDropController=require("./controllers/imageDragDropController");
const issuesfeedbackController=require("./controllers/issueFeedbackController");
const imageFlipContentController=require("./controllers/imageFlipContentController");
const discussionForumController=require("./controllers/discussionForumController")

router.post("/login", authController.login);

router.post(
  "/forgotPassword/validateEmail",
  authController.forgotPasswordValidateEmail
);

router.put("/resetPassword", authenticateToken, authController.resetPassword);

router.get("/userByToken", authenticateToken, authController.getUserByToken);

// ****************** Manage Roles ****************************
router.post("/role", authenticateToken, roleController.createRole);

router.get("/role", authenticateToken, roleController.getAllRoles);

router.get("/role/:id", authenticateToken, roleController.getRole);

router.put("/role/:id", authenticateToken, roleController.updateRole);

router.delete("/role/:id", authenticateToken, roleController.deleteRole);

// ****************** Manage subjects ****************************
router.post("/subject", authenticateToken, subjectController.createSubject);

router.get("/subject", authenticateToken, subjectController.getAllSubjects);

router.get("/subject/:id", authenticateToken, subjectController.getSubject);

router.put("/subject/:id", authenticateToken, subjectController.updateSubject);

router.delete("/subject/:id", authenticateToken, subjectController.deleteSubject);


// ****************** Manage standards ****************************
router.post("/standard", authenticateToken, standardController.createStandard);

router.get("/standard", authenticateToken, standardController.getAllStandards);

router.get("/standard/:id", authenticateToken, standardController.getStandard);

router.put("/standard/:id", authenticateToken, standardController.updateStandard);

router.delete("/standard/:id", authenticateToken, standardController.deleteStandard);


// ****************** Manage unit of measurement ****************************
router.post("/unitOfMeasurement", authenticateToken, unitOfMeasurementController.createUnitOfMeasurement);

router.get("/unitOfMeasurement", authenticateToken, unitOfMeasurementController.getAllUnitOfMeasurements);

router.get("/unitOfMeasurement/:id", authenticateToken, unitOfMeasurementController.getUnitOfMeasurement);

router.put("/unitOfMeasurement/:id", authenticateToken, unitOfMeasurementController.updateUnitOfMeasurement);

router.delete("/unitOfMeasurement/:id", authenticateToken, unitOfMeasurementController.deleteUnitOfMeasurement);


// ****************** Manage tools ****************************
router.post("/tool", authenticateToken, toolController.createTool);

router.get("/tool", authenticateToken, toolController.getAllTools);

router.get("/tool/:id", authenticateToken, toolController.getTool);

router.put("/tool/:id", authenticateToken, toolController.updateTool);

router.delete("/tool/:id", authenticateToken, toolController.deleteTool);


// ****************** Master ****************************
router.get("/master/safetyLevel", authenticateToken, masterController.getSafetyLevels);

router.get("/master/difficultyLevel", authenticateToken, masterController.getDifficultyLevels);

router.get("/master/category/:moduleKey", authenticateToken, masterController.getCategories);

router.get("/master/type/:moduleKey", authenticateToken, masterController.getTypes);

router.get("/master/uses/:moduleKey", authenticateToken, masterController.getUses);

router.get("/master/origin/:moduleKey", authenticateToken, masterController.getOrigins);

router.get("/master/tag/:moduleKey", authenticateToken, masterController.getTags);

router.post("/master/tag/:moduleKey", authenticateToken, masterController.createTag);

router.get("/master/answerType", authenticateToken, masterController.getAnswerTypes);

router.get("/master/language", authenticateToken, masterController.getLanguages);

router.get("/master/allergen", authenticateToken, masterController.getAllergens);

router.get("/master/grade", authenticateToken, masterController.getGrades);

router.get("/master/levelType", authenticateToken, masterController.getLevelTypes);

router.get("/master/learningType", authenticateToken, masterController.getLearningTypes);

router.get("/master/mealType", authenticateToken, masterController.getMealTypes);

router.get("/master/dietAndHealth", authenticateToken, masterController.getDietAndHealth);

router.post("/master/category/:moduleKey", authenticateToken, masterController.createCategory);

router.post("/master/allergen", authenticateToken, masterController.createAllergen);

router.get("/master/questionType", authenticateToken, masterController.getQuestionTypes);

router.get("/master/skill", authenticateToken, masterController.getSkills);

router.get("/master/season", authenticateToken, masterController.getSeasons);


// ****************** Common ****************************

router.post("/imageUpload", authenticateToken, commonController.imageUpload);

router.post("/fileUpload", authenticateToken, commonController.fileUpload);

// router.get("/demoFile", authenticateToken, commonController.getDemoFile);

router.post("/audioUpload", authenticateToken, commonController.audioUpload);

// ****************** Manage culinary techniques ****************************
router.post("/culinaryTechnique", authenticateToken, culinaryTechniqueController.createCulinaryTechnique);

router.get("/culinaryTechnique", authenticateToken, culinaryTechniqueController.getAllCulinaryTechniques);

router.get("/culinaryTechnique/:id", authenticateToken, culinaryTechniqueController.getCulinaryTechnique);

router.put("/culinaryTechnique/:id", authenticateToken, culinaryTechniqueController.updateCulinaryTechnique);

router.delete("/culinaryTechnique/:id", authenticateToken, culinaryTechniqueController.deleteCulinaryTechnique);


// ****************** Manage nutrient ****************************
router.post("/nutrient", authenticateToken, nutrientController.createNutrient);

router.get("/nutrient", authenticateToken, nutrientController.getAllNutrients);

router.get("/nutrient/:id", authenticateToken, nutrientController.getNutrient);

router.put("/nutrient/:id", authenticateToken, nutrientController.updateNutrient);

router.delete("/nutrient/:id", authenticateToken, nutrientController.deleteNutrient);


// ****************** Manage ingredient ****************************
router.post("/ingredient", authenticateToken, ingredientController.createIngredient);

router.get("/ingredient", authenticateToken, ingredientController.getAllIngredients);

router.get("/ingredient/:id", authenticateToken, ingredientController.getIngredient);

router.put("/ingredient/:id", authenticateToken, ingredientController.updateIngredient);

router.delete("/ingredient/:id", authenticateToken, ingredientController.deleteIngredient);

// ****************** Manage countries ****************************
router.post("/country",authenticateToken,countryController.createCountry);

router.get("/country",authenticateToken,countryController.getAllCountries)

router.get("/country/:id", authenticateToken,countryController.getCountry);

router.put("/country/:id", authenticateToken,countryController.updateCountry);

router.delete("/country/:id",authenticateToken, countryController.deleteCountry);

// ****************** Manage stamps ****************************
router.post("/stamp",authenticateToken, stampController.createStamp);

router.get("/stamp", authenticateToken,stampController.getStamps)

router.get("/stamp/:id", authenticateToken,stampController.getStamp);

router.put("/stamp/:id", authenticateToken,stampController.updateStamp);

router.delete("/stamp/:id",authenticateToken, stampController.deleteStamp);

// ****************** Manage lesson ****************************
router.post("/lesson", authenticateToken, lessonController.createLesson);

router.get("/lesson", authenticateToken, lessonController.getAllLessons);

router.get("/lesson/byGrade", authenticateToken, lessonController.getAllLessonsGroupByGrades);

router.get("/lesson/:id", authenticateToken, lessonController.getLesson);

router.put("/lesson/:id", authenticateToken, lessonController.updateLesson);

router.delete("/lesson/:id", authenticateToken, lessonController.deleteLesson);

router.post("/lesson/file", authenticateToken, lessonController.createLessonFromFile);

// ****************** Manage subscription package ****************************
router.post("/subscriptionPackage", authenticateToken, subscriptionPackageController.createSubscriptionPackage);

router.get("/subscriptionPackage", authenticateToken, subscriptionPackageController.getAllSubscriptionPackages);

router.get("/subscriptionPackage/:id", authenticateToken, subscriptionPackageController.getSubscriptionPackage);

router.put("/subscriptionPackage/:id", authenticateToken, subscriptionPackageController.updateSubscriptionPackage);

router.delete("/subscriptionPackage/:id", authenticateToken, subscriptionPackageController.deleteSubscriptionPackage);

// ****************** Manage district admin account ****************************
router.post("/districtAdmin", authenticateToken, districtAdminController.createDistrictAdmin);

router.get("/districtAdmin", authenticateToken, districtAdminController.getAllDistrictAdmins);

router.get("/districtAdmin/:id", authenticateToken, districtAdminController.getDistrictAdmin);

router.put("/districtAdmin/:id", authenticateToken, districtAdminController.updateDistrictAdmin);

router.delete("/districtAdmin/:id", authenticateToken, districtAdminController.deleteDistrictAdmin);


// ****************** Manage users ****************************
router.post("/user", authenticateToken, userController.createUser);

router.get("/user", authenticateToken, userController.getAllUsers);

router.get("/user/:id", authenticateToken, userController.getUser);

router.put("/user/:id", authenticateToken, userController.updateUser);

router.delete("/user/:id", authenticateToken, userController.deleteUser);


// ****************** Manage district admin account ****************************
router.post("/school", authenticateToken, schoolController.createSchool);

router.get("/school", authenticateToken, schoolController.getAllSchools);

router.get("/school/:id", authenticateToken, schoolController.getSchool);

router.put("/school/:id", authenticateToken, schoolController.updateSchool);

router.delete("/school/:id", authenticateToken, schoolController.deleteSchool);


//*********************Conversation Senetences********************** 

router.post("/conversationSentence",authenticateToken,conversationSentenceController.createConversationSentence)
router.get("/conversationSentence",authenticateToken,conversationSentenceController.getAllConversationSentence)
router.get("/conversationSentence/:id",authenticateToken,conversationSentenceController.getConversationSentence)
router.delete("/conversationSentence/:id",authenticateToken,conversationSentenceController.deleteConversationSentence)
router.put("/conversationSentence/:id",authenticateToken,conversationSentenceController.updateConversationSentence)


//**********************Health And Hygiene**************************

router.post("/healthHygiene",authenticateToken,healthHygieneController.createHealthHygiene)
router.get("/healthHygiene",authenticateToken,healthHygieneController.getAllHealthHygiene)
router.get("/healthHygiene/:id",authenticateToken,healthHygieneController.getHealthHygiene)
router.delete("/healthHygiene/:id",authenticateToken,healthHygieneController.deleteHealthHygiene)
router.put("/healthHygiene/:id",authenticateToken,healthHygieneController.updateHealthHygiene)


//***************************Manage Image Drag And Drop******************************* */
router.get("/imageDragDrop/categories",authenticateToken,imageDragDropController.getAllImageDragDropCategories)
router.post("/imageDragDrop",authenticateToken,imageDragDropController.createImageDragDrop)
router.get("/imageDragDrop",authenticateToken,imageDragDropController.getAllImageDragDrop)
router.get("/imageDragDrop/:id",authenticateToken,imageDragDropController.getImageDragDrop)
router.delete("/imageDragDrop/:id",authenticateToken,imageDragDropController.deleteImageDragDrop)
router.put("/imageDragDrop/:id",authenticateToken,imageDragDropController.updateImageDragDrop)


//***************************Manage Issues or Feedback****************************** */

router.get("/issueFeedback",authenticateToken,issuesfeedbackController.getAllIssuesFeedback)
router.put("/issueFeedback/:id",authenticateToken,issuesfeedbackController.updateIssuesFeedback)
router.get("/issueFeedback/:id",authenticateToken,issuesfeedbackController.getIssuesFeedback)


//*************************Manage image flip content************************* */
router.get("/imageFlipContent/categories",authenticateToken,imageFlipContentController.getAllImageFlipCategories)
router.post("/imageFlipContent",authenticateToken,imageFlipContentController.createImageFlipContent)
router.get("/imageFlipContent",authenticateToken,imageFlipContentController.getAllImageFlipContent)
router.get("/imageFlipContent/:id",authenticateToken,imageFlipContentController.getImageFlipContentById)
router.delete("/imageFlipContent/:id",authenticateToken,imageFlipContentController.deleteImageFlipContentById)
router.put("/imageFlipContent/:id",authenticateToken,imageFlipContentController.updateImageFlipContentById)


//*************************Manage Discussion Forum********************** */

router.post("/discussionForum",authenticateToken,discussionForumController.createDiscussionforum)
router.get("/discussionForum",authenticateToken,discussionForumController.getAllDiscussionforum)
router.get("/discussionForum/:id",authenticateToken,discussionForumController.getDiscussionforumById)
router.delete("/discussionForum/:id",authenticateToken,discussionForumController.deleteDiscussionforum)
router.put("/discussionForum/:id",authenticateToken,discussionForumController.updateDiscussionforum)



module.exports = router;
