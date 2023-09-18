const Joi = require('@hapi/joi');

const shortLinkCreateSchema = Joi.object({
  url: Joi.string().uri().required(),
});
 

  const updateLinkSchema = Joi.object({
    link_id: Joi.number().required(),
    new_link: Joi.string().uri().required(),
  });

  const shortLinkDeleteSchema = Joi.object({
    link_id: Joi.number().required(),
  });
  
  


module.exports = {shortLinkCreateSchema, updateLinkSchema , shortLinkDeleteSchema };
