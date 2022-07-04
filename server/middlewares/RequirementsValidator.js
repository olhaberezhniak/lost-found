const Joi = require("joi");

const RequirementSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
}).options({ allowUnknown: true });

const ValidateRequirement = (req, res, next) => {
  const result = RequirementSchema.validate(req.body);

  if (result.error)
    return res.status(400).send({ message: result.error.details[0].message });

  next();
};

exports.ValidateRequirement = ValidateRequirement;
