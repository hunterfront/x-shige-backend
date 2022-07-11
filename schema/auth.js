const joi = require("joi");
const { ERROR, CError } = require("../constants/ERROR");

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi
  .string()
  .alphanum()
  .min(1)
  .max(10)
  .required()
  .error(new CError(ERROR.LOGIN_REQUIRED, "账号不符合格式规范"));

// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()
  .error(new CError(ERROR.LOGIN_REQUIRED, "密码不符合规范"));

const email = joi
  .string()
  .pattern(/[\w.]+@\w+\.(com|net|edu)/)
  .required()
  .error(new CError(ERROR.LOGIN_REQUIRED, "email不符合规范"));

// 注册和登录表单的验证规则对象
exports.signin_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
};

exports.signup_schema = {
  body: {
    username,
    password,
    email,
  },
};
