const express = require('express');
const router = express.Router();
const registrationController = require('./registration_controller');
const basicAuthenticate = require('../../middleware/basic_auth_middleware');

router.post('/sign-up', basicAuthenticate, registrationController.registerUser);

router.post('/resend-sign-up-otp', basicAuthenticate, registrationController.otpResend);

router.post('/otp-check', basicAuthenticate, registrationController.otpCheck);

module.exports = router;