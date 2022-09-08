const User = require("../models/User")
const { NotFound,BadRequest, NotAuthorized } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { email, password,username } = req.body;
  const user = await User.create({ email, password, username });
  if (!user)
  {
    throw new NotFound("Failed to register user");
  }
  res.status(StatusCodes.CREATED).json({ msg:"New user registered"});
} 
const login = async (req, res) => {
  const { body: { email, password }} = req
  if (!email || !password) { 
    throw new BadRequest("Please provide password and email");
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFound("Credentials are invalid");
  }
  const isMatch = await user.comparePass(password)
  if (isMatch) {
    const token = user.createJWT();
    // const now = new Date();
    // const date = new Date(now + 60 * 60 * 1000);
    // res.cookie("token_cookie", token, { expires: date });
    res.status(200).json({ msg:"You are logged in",token,username:user.username})
  } else {
    throw new NotAuthorized("Invalid password provided")
  }
};

module.exports = { register, login };