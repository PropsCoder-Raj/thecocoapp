// Import the Express framework
const express = require('express');

// Create a new router instance
const router = express.Router();

router.use('/auth', require('./routes/auth'));
router.use('/school', require('./routes/school'));
router.use('/child', require('./routes/child'));
router.use('/dashboard', require('./routes/dashboard'));
router.use('/questions', require('./routes/questions'));
router.use('/user', require('./routes/user'));
router.use('/admin', require('./routes/admin'));

// Export the router instance to make it available for use in other parts of the application
module.exports = router;
