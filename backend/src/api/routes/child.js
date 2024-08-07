// Import the Express framework
const express = require('express');

const { validateRequest } = require("../../middlewares")

// Import middleware for token verification
const { verifyToken } = require("../../middlewares");

// Import the controller module for child operations
const controller = require('../controllers/child');

// Create a new router instance
const router = express.Router();

// Define a route handler for GET requests to the '/get-all-childs' endpoint
router.get('/get-all-childs', verifyToken, controller.getAllChild);

// Define a route handler for GET requests to the '/create' endpoint
router.post('/create', verifyToken, controller.createChild);

// Export the router instance to make it available for use in other parts of the application
module.exports = router;
