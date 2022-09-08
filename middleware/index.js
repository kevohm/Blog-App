const authenticate = require("./authenticate")
const errorHandler = require("./ErrorHandler");
const notFound = require("./notfound");
const authAdmin = require("./admin")

module.exports = { authAdmin,authenticate, notFound, errorHandler };