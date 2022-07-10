"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "John",
          password: "123456",
          email: "abc@qq.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Mike",
          password: "123456",
          email: "mn@qq.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
