const express = require('express');
const router = express.Router();
const loginController = require('./login_controller');

router.post('/sign-in', loginController.loginUser);


module.exports = router;