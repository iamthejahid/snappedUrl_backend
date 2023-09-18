const express = require('express');
const router = express.Router();
const loginController = require('./login_controller');

router.post('/log-in', loginController.loginUser);


module.exports = router;