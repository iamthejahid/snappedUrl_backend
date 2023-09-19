/**
 * @swagger
 * tags:
 *   name: Version
 *   description: API endpoints for version checking and updates
 */

/**
 * @swagger
 * /api/check-version:
 *   get:
 *     summary: Check the version of the application.
 *     description: Returns information about the application version.
 *     tags: [Version]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with version information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isUpdateAvailable:
 *                   type: boolean
 *                   description: Indicates if an update is available.
 *                 isForce:
 *                   type: boolean
 *                   description: Indicates if the update is mandatory.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /api/update-version:
 *   post:
 *     summary: Update the application version information.
 *     description: Allows updating the application version information.
 *     tags: [Version]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               version:
 *                 type: string
 *                 description: The new version of the application.
 *               isForce:
 *                 type: boolean
 *                 description: Indicates if the update is mandatory.
 *     responses:
 *       201:
 *         description: Version information updated successfully.
 *       400:
 *         description: Bad request due to invalid input.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */


const express = require('express');
const router = express.Router();
const versionController = require('./controller');
const validateVersionField = require('./middleware');
const basicAuthenticate = require('../../middleware/basic_auth_middleware');



// Define the route for version checking
router.get('/check-version', basicAuthenticate, versionController.checkVersion);


router.post('/update-version', basicAuthenticate, validateVersionField, versionController.inputInfo);


module.exports = router;