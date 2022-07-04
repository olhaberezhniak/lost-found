// Packages imports
const bcrypt = require("bcrypt");
const { random } = require("lodash");

const { OTP } = require("../models/OTP");
const { VERIFICATION_TYPES } = require("../schemas/OTP");


async function CreateOTP(verification_type) {
  try {
    if (!Object.values(VERIFICATION_TYPES).includes(verification_type))
      return { ok: false };

    const newOtp = new OTP({
      verification_type: VERIFICATION_TYPES[verification_type],
    });

    const OTP_Random = random(100000, 999999).toString();

    const salt = await bcrypt.genSalt(10);
    newOtp.otp = await bcrypt.hash(OTP_Random, salt);

    await newOtp.save();

    return { otp_id: newOtp._id, otp: OTP_Random, ok: true };
  } catch (error) {
    return { ok: false };
  }
}

exports.CreateOTP = CreateOTP;
