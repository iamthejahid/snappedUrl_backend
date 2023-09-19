/**
 * @swagger
 * /api/sign-up:
 *   post:
 *     summary: Register a new user in the Snapped URL system
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password (minimum 6 characters)
 *               full_name:
 *                 type: string
 *                 description: User's full name
 *     responses:
 *       201:
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Registration successful message
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_name:
 *                       type: string
 *                       description: User's full name
 *                     user_id:
 *                       type: number
 *                       description: User's unique ID
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message for invalid request data
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Internal server error message
 */
/**
 * @swagger
 * /api/resend-sign-up-otp:
 *   post:
 *     summary: Resend OTP for user registration
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *                 description: User's unique ID
 *     responses:
 *       201:
 *         description: OTP resend successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: OTP resend successful message
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: number
 *                       description: User's unique ID
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message for invalid request data
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Internal server error message
 *
 * /api/otp-check:
 *   post:
 *     summary: Verify OTP for user registration
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *                 description: User's unique ID
 *               otp:
 *                 type: number
 *                 description: OTP sent to the user's email
 *     responses:
 *       201:
 *         description: OTP verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: OTP verification successful message
 *                 isVerified:
 *                   type: boolean
 *                   description: Indicates whether the OTP is verified
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token for authenticated user
 *                     user_info:
 *                       type: object
 *                       description: User's information
 *                       properties:
 *                         user_id:
 *                           type: number
 *                           description: User's unique ID
 *                         email:
 *                           type: string
 *                           description: User's email address
 *       400:
 *         description: Invalid request data or OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message for invalid request data or OTP
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Internal server error message
 */


const express = require('express');
const router = express.Router();
const registrationController = require('./registration_controller');
const basicAuthenticate = require('../../middleware/basic_auth_middleware');

router.post('/sign-up', basicAuthenticate, registrationController.registerUser);

router.post('/resend-sign-up-otp', basicAuthenticate, registrationController.otpResend);

router.post('/otp-check', basicAuthenticate, registrationController.otpCheck);

module.exports = router; 