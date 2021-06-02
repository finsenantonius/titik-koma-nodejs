//validation
const Joi = require("@hapi/joi");

//register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    score: Joi.number().required(),
    avatar: Joi.number().required(),
  });
  const validationRegis = schema.validate(data);
  return validationRegis;
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });
  const validationLogin = schema.validate(data);
  return validationLogin;
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
