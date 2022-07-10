"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Role.belongsToMany(models.User, {
        through: UserRoles,
        foreignKey: "roleId",
        otherKey: "userId",
      });

      models.User.belongsToMany(models.Role, {
        through: UserRoles,
        foreignKey: "userId",
        otherKey: "roleId",
      });
    }
  }
  UserRoles.init(
    {
      userId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserRoles",
    }
  );
  return UserRoles;
};
