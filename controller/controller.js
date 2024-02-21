const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
// const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");
class Controller {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { message: "Email or password is required" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { message: "Email/password invalid" };
      }
      if (!comparePassword(password, user.password)) {
        throw { message: "Email/password invalid" };
      }
      //Continue here:
      const payload = {
        email: user.email,
        role: user.role,
      };
      const access_token = signToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  static async secret(req, res) {
    //Continue here:
    const { email, role } = req.loginInfo;
    res.send(`${email} - ${role}`);
  }
}

module.exports = Controller;
