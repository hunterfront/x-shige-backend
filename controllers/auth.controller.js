const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
const { ERROR, CError } = require("../constants/ERROR");
var bcrypt = require("bcryptjs");

const userService = require("../services/user.service");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await userService.createUser({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    if (req.body.roles) {
      const roles = await userService.findRolesByNames(req.body.roles);
      await user.setRoles(roles);
      res.send({ message: "User was registered successfully!" });
    } else {
      // user role = 1
      user.setRoles([1]).then(() => {
        res.send({ message: "User was registered successfully!" });
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.signin = async (req, res, next) => {
  try {
    const user = await userService.findUserByName(req.body.username);
    if (!user) {
      throw new CError(ERROR.LOGIN_REQUIRED, "You should login first");
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    const roles = await user.getRoles();
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: roles.map((role) => role.name),
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
