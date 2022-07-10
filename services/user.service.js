const db = require("../models");
const User = db.User;
const Role = db.Role;
const Op = db.Sequelize.Op;

exports.createUser = async (user) => {
  return await User.create(user);
};

exports.findRolesByNames = async (names) => {
  return await Role.findAll({
    where: {
      name: {
        [Op.or]: names,
      },
    },
  });
};

exports.findUserByName = async (name) => {
  return await User.findOne({
    where: {
      username: name,
    },
  });
};
