const Joi = require("joi");

const MinPasswordLen = 6;
const MaxPasswordLen = 20;

const RegisterSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name is required",
  }),
  email: Joi.string().email().required("Email is required"),
  phone: Joi.string().required("Phone is required").length(10).messages({
    "string.length": "Phone must be valid 10 digit number",
    "any.required": `Phone is required`,
    "string.empty": `Phone cannot be an empty.`,
  }),
  password: Joi.string()
    .min(6)
    .max(20)
    .required("Password is required")
    .messages({
      "string.min": `Password must be atleast ${MinPasswordLen} characters long`,
      "string.max": `Password must be atmost ${MaxPasswordLen} characters long`,
    }),
  push_notification_token: Joi.string().allow(""),
  remote_profile_picture: Joi.string().allow("").optional(),
}).options({ allowUnknown: true });

const ValidateRegister = (req, res, next) => {
  let newBody = {
    ...req.body,
    ...(req.file?.buffer && {
      profile_picture: req.file.buffer,
    }),
  };

  const result = RegisterSchema.validate(req.body);

  if (result.error) return res.status(400).send({ message: result.error.details[0].message });

  req.body = newBody;

  next();
};

exports.ValidateRegister = ValidateRegister;
exports.RegisterSchema = RegisterSchema;
