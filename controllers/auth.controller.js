const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const { ERROR, CError } = require("../constants/ERROR");
const bcrypt = require("bcryptjs");

const userService = require("../services/user.service");

exports.signup = async (req, res, next) => {
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
      res.send({
        code: 0,
        message: "User was registered successfully!",
      });
    } else {
      // user role = 1
      user.setRoles([1]).then(() => {
        res.send({
          code: 0,
          message: "User was registered successfully!",
        });
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.signin = async (req, res, next) => {
  try {
    const user = await userService.findUserByName(req.body.username);
    if (!user) {
      return next(new CError(ERROR.DATA_INVALID, "用户名或密码错误"));
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return next(new CError(ERROR.DATA_INVALID, "用户名或密码错误"));
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: "20",
    });
    const roles = await user.getRoles();
    res.send({
      code: 0,
      message: "ok",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: roles.map((role) => role.name),
        accessToken: "Bearer " + token,
      },
    });
  } catch (error) {
    next(error);
  }
};
