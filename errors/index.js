const BadRequest = require("./BadRequest")
const NotAuthorized = require("./authenticated");
const NotFound = require("./notFound")

module.exports = { NotFound, BadRequest, NotAuthorized };