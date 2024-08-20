// Import the Express framework
const express = require('express');

const { validateRequest } = require("../../middlewares")
const { loginAdminSchema } = require("../helper/validationSchema")

// Import middleware for token verification
const { verifyAdminToken } = require("../../middlewares");

// Import the controller module for user operations
const controller = require('../controllers/admin');

// Create a new router instance
const router = express.Router();

// Define a route handler for POST requests to the '/login' endpoint
router.post('/login', validateRequest(loginAdminSchema), controller.loginAdmin);


// Define a route handler for GET requests to the '/dashboard-count' endpoint
router.get('/dashboard-count', verifyAdminToken, controller.dashboardCount);

// Export the router instance to make it available for use in other parts of the application
module.exports = router;
