const Joi = require("joi");

const MSG = {
  EMAIL: {
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required"
  },
  PASSWORD: {
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required"
  },
}

const register_schema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 2 characters long",
    "any.required": "Name is required"
  }),
  email: Joi.string().required().email().messages(MSG.EMAIL),
  password: Joi.string().min(6).required().messages(MSG.PASSWORD)
});

const login_schema = Joi.object({
  email: Joi.string().required().email().messages(MSG.EMAIL),
  password: Joi.string().min(6).required().messages(MSG.PASSWORD)
});

module.exports = {
  register_schema,
  login_schema
};
