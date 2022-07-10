"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserRoles", {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("UserRoles", {
      fields: ["roleId", "userId"],
      type: "primary key",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserRoles");
  },
};
