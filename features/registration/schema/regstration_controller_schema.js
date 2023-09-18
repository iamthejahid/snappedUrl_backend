const Joi = require('@hapi/joi');

const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  full_name: Joi.string().required(),
});

const otpResendSchema = Joi.object({
  user_id: Joi.number().required(),
});


const otpVerificationSchema = Joi.object({
  user_id: Joi.number().required(),
  otp: Joi.number().integer().min(1000).max(9999).required(),
});

module.exports = {
  registerUserSchema, 
  otpResendSchema,
  otpVerificationSchema,
};