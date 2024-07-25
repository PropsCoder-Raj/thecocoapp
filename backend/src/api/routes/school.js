// Import the Express framework
const express = require('express');

const { validateRequest } = require("../../middlewares")

// Import middleware for token verification
const { verifyToken } = require("../../middlewares");

// Import the controller module for school operations
const controller = require('../controllers/school');

// Create a new router instance
const router = express.Router();

// Define a route handler for GET requests to the '/get-all-schools' endpoint
router.get('/get-all-schools', controller.getAllSchools);

// Define a route handler for GET requests to the '/is-valid-school' endpoint
router.get('/is-valid-school', controller.isValidSchool);

// Define a route handler for PUT requests to the '/update-school' endpoint
router.put('/update-school', verifyToken, controller.updateSchoolDetails);

// Define a route handler for POST requests to the '/create-school' endpoint
router.put('/create-school', verifyToken, controller.createSchoolDetails);

// Export the router instance to make it available for use in other parts of the application
module.exports = router;
