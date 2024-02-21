const jwt = require("jsonwebtoken");
SECRET_KEY = process.env.SECRET_KEY;

const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const decode = (token) => {
  return jwt.decode(token, SECRET_KEY);
};

module.exports = { signToken, decode };
