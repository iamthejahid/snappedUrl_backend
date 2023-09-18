const Joi = require('@hapi/joi');

const loginUserSchema = Joi.object({
  fcm_token: Joi.string().allow('', null), // Optional fcm_token
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = loginUserSchema;
