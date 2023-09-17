const express = require('express');
const router = express.Router();
const versionController = require('./controller');
const validateVersionField = require('./middleware'); 
const basicAuthenticate = require('../../middleware/basic_auth_middleware');


// Define the route for version checking
router.get('/check-version', versionController.checkVersion);


router.post('/update-version', basicAuthenticate, validateVersionField, versionController.inputInfo);


module.exports = router;