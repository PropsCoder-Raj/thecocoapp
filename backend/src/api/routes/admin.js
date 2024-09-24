// Import the Express framework
const express = require('express');

const { validateRequest } = require("../../middlewares")
const { loginAdminSchema } = require("../helper/validationSchema")

const upload = require('../helper/multerConfig');

// Import middleware for token verification
const { verifyAdminToken } = require("../../middlewares");

// Import the controller module for user operations
const controller = require('../controllers/admin');
const SchoolController = require('../controllers/admin/school');
const ChildController = require('../controllers/admin/childs');
const StandardsController = require('../controllers/admin/standards');
const modulesController = require('../controllers/admin/modules');
const levelsController = require('../controllers/admin/levels');
const lessonsController = require('../controllers/admin/lessons');
const questionsController = require('../controllers/admin/questions');

// Create a new router instance
const router = express.Router();

// Define a route handler for POST requests to the '/login' endpoint
router.post('/login', validateRequest(loginAdminSchema), controller.loginAdmin);

// Define a route handler for GET requests to the '/dashboard-count' endpoint
router.get('/dashboard-count', verifyAdminToken, controller.dashboardCount);


/*************************Schools Section*****************************/

// Define a route handler for GET requests to the '/school-list' endpoint
router.get('/school-list', verifyAdminToken, SchoolController.schoolsList);

// Define a route handler for GET requests to the '/school-details' endpoint
router.get('/school-details', verifyAdminToken, SchoolController.getSchoolDetails);

// Define a route handler for GET requests to the '/school-children-list' endpoint
router.get('/school-children-list', verifyAdminToken, SchoolController.schoolChildrenList);

// Define a route handler for PUT requests to the '/update-school' endpoint
router.put('/update-school', verifyAdminToken, SchoolController.updateSchoolDetails);

// Define a route handler for POST requests to the '/create-school' endpoint
router.post('/create-school', verifyAdminToken, SchoolController.createSchoolDetails);




// Define a route handler for GET requests to the '/users-list' endpoint
router.get('/users-list', verifyAdminToken, controller.usersList);

// Define a route handler for GET requests to the '/user-details' endpoint
router.get('/user-details', verifyAdminToken, controller.getUserDetails);

// Define a route handler for POST import requests to the '/import-users' endpoint
router.post('/import-users/:school_id', verifyAdminToken, upload.single('excel'), controller.importUsers);



/*************************Childs Section*****************************/

// Define a route handler for GET requests to the '/child/get-all-childs/:type' endpoint
router.get('/child/get-all-childs/:type', verifyAdminToken, ChildController.getAllChild);
4





/*************************standards Section*****************************/

// Define a route handler for GET requests to the '/standards/get-all-standards' endpoint
router.get('/standards/get-all-standards', verifyAdminToken, StandardsController.standardsList);



/*************************modules Section*****************************/

// Define a route handler for GET requests to the '/modules/get-all-modules' endpoint
router.get('/modules/get-all-modules', verifyAdminToken, modulesController.modulesList);

// Define a route handler for PUT requests to the '/modules/update-module/:module_id' endpoint
router.put('/modules/update-module/:module_id', verifyAdminToken, modulesController.updateModule);


/*************************levels Section*****************************/

// Define a route handler for GET requests to the '/levels/get-all-levels' endpoint
router.get('/levels/get-all-levels', verifyAdminToken, levelsController.getAllLevels);


/*************************lessons Section*****************************/

// Define a route handler for GET requests to the '/lessons/get-all-lessons' endpoint
router.get('/lessons/get-all-lessons', verifyAdminToken, lessonsController.getAllLessons);


/*************************questions Section*****************************/

// Define a route handler for GET requests to the '/questions/get-all-questions' endpoint
router.get('/questions/get-all-questions', verifyAdminToken, questionsController.getAllQuestions);


// Export the router instance to make it available for use in other parts of the application
module.exports = router;
