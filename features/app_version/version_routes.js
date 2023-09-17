const express = require('express');
const router = express.Router();
const versionController = require('./controller');
const validateVersionField = require('./middleware'); // Import the middleware

// Define the route for version checking
router.get('/check-version', versionController.checkVersion);


router.post('/update-version', validateVersionField, versionController.inputInfo);


module.exports = router;