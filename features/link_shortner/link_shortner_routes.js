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