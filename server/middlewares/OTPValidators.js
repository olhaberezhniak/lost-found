const Joi = require("joi");

const OTPSchema = Joi.object({
  otp_id: Joi.string().required().messages({
    "any.required": `OTP ID is required`,
    "string.empty": `OTP ID cannot be an empty field`,
  }),
  otp: Joi.string().required().messages({
    "any.required": `OTP is required`,
    "string.empty": `OTP cannot be an empty field`,
  }),
}).options({ allowUnknown: true });

const ValidateOTPBody = (req, res, next) => {
  const result = OTPSchema.validate(req.body);

  if (result.error)
    return res
      .status(400)
      .send({ message: result.error.details[0].message, isVerified: false });

  next();
};

exports.ValidateOTPBody = ValidateOTPBody;
