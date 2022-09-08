const { NotAuthorized } = require("../errors/index");

const authAdmin = (req, res, next) => {
    const { role } = req.user;
    if (role === "admin") {
        next();
    } else {
  throw new NotAuthorized("You are not authenticated to this route");
}
};
module.exports = authAdmin;
