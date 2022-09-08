const CustomError = require("./CustomError")
const {StatusCodes} = require("http-status-codes")
class NotAuthenticated extends CustomError{
    constructor(msg) {
        super(msg)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}
module.exports = NotAuthenticated