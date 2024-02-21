const { decode } = require("../helpers/jwt");
// const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    //continue:
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const verify = decode(token);
    // console.log(verify);
    req.loginInfo = {
      email: verify.email,
      role: verify.role,
    };
    next();
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = authentication;
