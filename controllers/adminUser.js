const User = require("../models/User");
const { NotFound} = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res) => {
  const { username, email, role, password } = req.body
  const user = await User.create({ username, email, role, password});
  if (!user)
  {
    throw new NotFound("User not created");
  }
  res.status(StatusCodes.CREATED).json({user})
}
const deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findByIdAndDelete({ _id: id });
  if (!user) {
    throw new NotFound("User not Found");
  }
  res.status(StatusCodes.OK).json({ msg: `You delete user with id: ${id}` });
};
const updateUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findByIdAndUpdate(
    { _id: id },
    {...req.body},
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new NotFound("User not Found");
  }
  res.status(StatusCodes.OK).json({ msg: `You updated user with id: ${id}` });
};
const getAll = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};
const getSingle = async (req,res)=>{
  const { params: { id } } = req
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new NotFound("User not Found");
  }
  res.status(StatusCodes.OK).json({user})
}
module.exports = { deleteUser, getAll, updateUser, createUser, getSingle };
