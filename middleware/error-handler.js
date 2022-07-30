const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode,
    msg: err.message,
  };
  if (err.code && err.code === 11000) {
    customError.statusCode = 400;
    customError.msg = `Please provide another ${Object.entries(err.keyValue).map(
      ([key, value]) => `${key}, ${value}`,
    )} already in use`;
  }
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((i) => `${i.message}`)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `No job found with id ${err.value}`;
    customError.statusCode=404
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
