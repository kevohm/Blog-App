const CustomError = require("./CustomError")
const {StatusCodes}  = require("http-status-codes")

class BadRequest extends CustomError{
    constructor(msg) {
        super(msg)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequest