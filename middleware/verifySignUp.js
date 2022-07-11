const { CError, ERROR } = require("../constants/ERROR");
const db = require("../models");
const ROLES = db.ROLES;
const User = db.User;
const Role = db.Role;
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      return next(new CError(ERROR.DATA_EXISTED, "用户已经存在"));
    }
    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        return next(new CError(ERROR.DATA_EXISTED, "email已经存在"));
      }
      next();
    });
  });
};
checkRolesExisted = async (req, res, next) => {
  const roles = await Role.findAll({ raw: true });
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!roles.find((item) => item.name === req.body.roles[i])) {
        return next(
          new CError(ERROR.DATA_INVALID, `角色不存在：${req.body.roles[i]}`)
        );
      }
    }
  }
  next();
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};
module.exports = verifySignUp;
