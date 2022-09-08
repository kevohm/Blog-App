const customError = require("./CustomError")
const {StatusCodes} = require("http-status-codes")

class NotFound extends customError{
    constructor(msg) {
        super(msg)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}
module.exports = NotFound