const jwt = require("jsonwebtoken");

function JWT_Sign(payload) {
  return jwt.sign(payload, process.env.JWT_Key);
}

function JWT_Verify(token) {
  const isTokenValid = jwt.verify(token, process.env.JWT_Key);

  return isTokenValid;
}

exports.JWT_Sign = JWT_Sign;
exports.JWT_Verify = JWT_Verify;
