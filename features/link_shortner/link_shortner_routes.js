/**
 * @swagger
 * /api/short-link:
 *   post:
 *     summary: Create a new short link
 *     tags:
 *       - Short Links
 *     security:
 *       - bearerAuth: [] # Requires Bearer Token Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: The original URL to shorten
 *           example:
 *             url: "https://example.com/long-link"
 *     responses:
 *       201:
 *         description: Short link successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       description: Original URL
 *                     shortLink:
 *                       type: string
 *                       description: Generated short link
 *               example:
 *                 message: Short link Created
 *                 data:
 *                   url: "https://example.com/long-link"
 *                   shortLink: "https://your-short-domain/sl/1"
 *       400:
 *         description: Bad request, invalid URL provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 message: "Invalid URL format"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
/**
 * @swagger
 * /api/short-link:
 *   put:
 *     summary: Update a short link URL
 *     tags:
 *       - Short Links
 *     security:
 *       - bearerAuth: [] # Requires Bearer Token Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link_id:
 *                 type: number
 *                 description: The ID of the short link to update
 *               new_link:
 *                 type: string
 *                 format: uri
 *                 description: The new URL to replace the existing one
 *           example:
 *             link_id: 1
 *             new_link: "https://example.com/new-link"
 *     responses:
 *       201:
 *         description: Short link URL successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       description: Updated URL
 *                     shortLink:
 *                       type: string
 *                       description: Short link with the updated URL
 *               example:
 *                 message: Short link Updated
 *                 data:
 *                   url: "https://example.com/new-link"
 *                   shortLink: "https://your-short-domain/sl/1"
 *       400:
 *         description: Bad request, invalid data provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 message: "Invalid data provided"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Short link not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 message: "Short link not found"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /api/short-link:
 *   delete:
 *     summary: Delete a short link by its ID
 *     tags:
 *       - Short Links
 *     security:
 *       - bearerAuth: [] # Requires Bearer Token Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               link_id:
 *                 type: number
 *                 description: The ID of the short link to delete
 *           example:
 *             link_id: 1
 *     responses:
 *       200:
 *         description: Short link successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *               example:
 *                 message: "Short link deleted successfully"
 *       400:
 *         description: Bad request, invalid data provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 message: "Invalid data provided"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Short link not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 message: "Short link not found"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /api/short-link-generated:
 *   get:
 *     summary: Get a list of short links generated by the user
 *     tags:
 *       - Short Links
 *     security:
 *       - bearerAuth: [] # Requires Bearer Token Authentication
 *     responses:
 *       200:
 *         description: List of short links generated by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: array
 *                   description: List of short links
 *                   items:
 *                     type: object
 *                     properties:
 *                       created_by:
 *                         type: number
 *                         description: ID of the user who created the short link
 *                       url:
 *                         type: string
 *                         description: Original URL
 *                       short_link:
 *                         type: number
 *                         description: Short link ID
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the short link was created
 *                       last_visited_at:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the short link was last visited
 *                       total_visit:
 *                         type: number
 *                         description: Total number of visits to the short link
 *               example:
 *                 message: "List of Short Links"
 *                 data: 
 *                   - 
 *                     created_by: 1
 *                     url: "https://example.com"
 *                     short_link: 123
 *                     created_at: "2023-09-20T10:30:00Z"
 *                     last_visited_at: "2023-09-21T15:45:00Z"
 *                     total_visit: 5
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
/**
 * @swagger
 * /api/short-link-generated:
 *   get:
 *     summary: Get a list of short links generated by the user
 *     tags:
 *       - Short Links
 *     security:
 *       - bearerAuth: [] # Requires Bearer Token Authentication
 *     responses:
 *       200:
 *         description: List of short links generated by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: array
 *                   description: List of short links
 *                   items:
 *                     type: object
 *                     properties:
 *                       created_by:
 *                         type: number
 *                         description: ID of the user who created the short link
 *                       url:
 *                         type: string
 *                         description: Original URL
 *                       short_link:
 *                         type: number
 *                         description: Short link ID
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the short link was created
 *                       last_visited_at:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the short link was last visited
 *                       total_visit:
 *                         type: number
 *                         description: Total number of visits to the short link
 *               example:
 *                 message: "List of Short Links"
 *                 data: 
 *                   - 
 *                     created_by: 1
 *                     url: "https://example.com"
 *                     short_link: 123
 *                     created_at: "2023-09-20T10:30:00Z"
 *                     last_visited_at: "2023-09-21T15:45:00Z"
 *                     total_visit: 5
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
/**
 * @swagger
 * /api/short-link-generated:
 *   get:
 *     summary: Get a list of short links generated by the user
 *     tags:
 *       - Short Links
 *     security:
 *       - bearerAuth: [] # Requires Bearer Token Authentication
 *     responses:
 *       200:
 *         description: List of short links generated by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: array
 *                   description: List of short links
 *                   items:
 *                     type: object
 *                     properties:
 *                       created_by:
 *                         type: number
 *                         description: ID of the user who created the short link
 *                       url:
 *                         type: string
 *                         description: Original URL
 *                       short_link:
 *                         type: number
 *                         description: Short link ID
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the short link was created
 *                       last_visited_at:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time when the short link was last visited
 *                       total_visit:
 *                         type: number
 *                         description: Total number of visits to the short link
 *               example:
 *                 message: "List of Short Links"
 *                 data:
 *                   - created_by: 1
 *                     url: "https://example.com"
 *                     short_link: 123
 *                     created_at: "2023-09-20T10:30:00Z"
 *                     last_visited_at: "2023-09-21T15:45:00Z"
 *                     total_visit: 5
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
/**
 * @swagger
 * /api/{shortLinkId}:
 *   get:
 *     summary: Redirect to the original URL associated with a short link
 *     tags:
 *       - Short Links
 *     parameters:
 *       - name: shortLinkId
 *         in: path
 *         required: true
 *         description: The ID of the short link to redirect to
 *         schema:
 *           type: integer
 *     responses:
 *       302:
 *         description: Redirect to the original URL
 *       404:
 *         description: Short link not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 message: "Short link not found"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */



const express = require('express');
const router = express.Router();
const linkShortenController = require('./link_shortner_controller');
const bearerAuthenticate = require('../../middleware/bearer_atuh_middleware');

// Create
router.post('/short-link', bearerAuthenticate, linkShortenController.shortLinkCreate);
// Update
router.put('/short-link', bearerAuthenticate, linkShortenController.updateLink);
// Delete
router.delete('/short-link', bearerAuthenticate, linkShortenController.shortLinkdelete);


router.get('/short-link-generated', bearerAuthenticate, linkShortenController.generatedLinkList);

router.get('/:shortLinkId', linkShortenController.shortLinkFiring);



module.exports = router;