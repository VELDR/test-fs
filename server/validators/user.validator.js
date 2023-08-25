const Joi = require('joi');

const registerValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password length must be at least {#limit} characters long',
  }),
});

const loginValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const userValidator = {
  registerValidator,
  loginValidator,
};

module.exports = userValidator;
