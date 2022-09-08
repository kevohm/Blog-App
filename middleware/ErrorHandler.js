
const { StatusCodes} = require("http-status-codes")

const ErrorHandler = (err, req, res, next) => {
    let customErr = {
        msg: err.message || "Internal Server Error",
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    }
    if (err.name === "ValidationError") {
        const key = Object.values(err.errors)
        const kind = Object.values(key[0])[1];
        customErr.msg = (kind === "required") ? "Please provide " + key.map((item) => item.path).join(", "):
        key.map((item) => item.message).join("");
        customErr.statusCode = StatusCodes.BAD_REQUEST
    }
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      customErr.statusCode = StatusCodes.UNAUTHORIZED;
      customErr.msg = "You are not authorized for this route";
    }
      if (err.code && err.code === 11000) {
        const [key] = Object.entries(err.keyValue);
        customErr.msg = `${key[0]} already exists`;
        customErr.statusCode = StatusCodes.BAD_REQUEST;
      }
    if ((err.name === "CastError")) {
        customErr.msg = err.message.slice(0,23) + " for " + err.path
  }
  if (err.message.startsWith("Could not connect to any servers")) {
    customErr.msg = "Check your Internet connection"
  }
    return res.status(customErr.statusCode).json({ msg: customErr.msg });
}

module.exports = ErrorHandler 