// Import the Express framework
const express = require('express');

const { validateRequest } = require("../../middlewares")

// Import middleware for token verification
const { verifyToken } = require("../../middlewares");

// Import the controller module for user operations
const controller = require('../controllers/user');

// Create a new router instance
const router = express.Router();

// Define a route handler for GET requests to the '/get-profile' endpoint
router.get('/get-profile', verifyToken, controller.getProfile);

// Define a route handler for GET requests to the '/update-profile' endpoint
router.put('/update-profile', verifyToken, controller.updateProfile);

// Define a route handler for GET requests to the '/upload-photo' endpoint
router.post('/upload-photo', verifyToken, controller.uploadPhoto);

// Export the router instance to make it available for use in other parts of the application
module.exports = router;
