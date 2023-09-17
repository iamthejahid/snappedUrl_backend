const express = require('express');
const router = express.Router();
const linkShortenController = require('./link_shortner_controller');
const bearerAuthenticate = require('../../middleware/bearer_atuh_middleware');


router.post('/short-link', bearerAuthenticate, linkShortenController.shortLinkCreate);


module.exports = router;