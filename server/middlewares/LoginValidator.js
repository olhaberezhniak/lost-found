const Joi = require("joi");

const LoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  push_notification_token: Joi.string().allow(""),
}).options({ allowUnknown: true });

const ValidateLogin = (req, res, next) => {
  const result = LoginSchema.validate(req.body);

  if (result.error)
    return res.status(400).send({ message: result.error.details[0].message });

  next();
};

exports.LoginSchema = LoginSchema;
exports.ValidateLogin = ValidateLogin;
