const { ERROR } = require("../constants/ERROR");

module.exports = async function errorHandler(err, req, res, next) {
  console.log(err);
  let status;

  switch (err.type) {
    case ERROR.FORMAT_INVALID:
    case ERROR.DATA_EXISTED:
    case ERROR.DATA_INVALID:
      status = 400;
      break;
    case ERROR.LOGIN_REQUIRED:
      status = 401;
      break;
    case ERROR.PERMISSION_DENIED:
      status = 403;
      break;
    case ERROR.DATA_NOT_FOUND:
      status = 404;
      break;
    default:
      status = 500;
  }

  res.status(status).send(err);
};
