const jwt = require("jsonwebtoken")
const { NotAuthorized } = require("../errors/index");

const authenticate = async (req, res, next) => {
  const auth = req.headers["authorization"];
  if (auth && auth.startsWith('Bearer')) {
      const token = auth.split(' ')[1]
      const { userId, role, username} = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = { userId, role, username };
      next();
    } else {
      throw new NotAuthorized("You are not authenticated to this route");
    }
}
module.exports = authenticate