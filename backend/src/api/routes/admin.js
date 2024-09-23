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






/*************************standards Section*****************************/

// Define a route handler for GET requests to the '/standards/get-all-standards' endpoint
router.get('/standards/get-all-standards', verifyAdminToken, StandardsController.standardsList);


// Export the router instance to make it available for use in other parts of the application
module.exports = router;
