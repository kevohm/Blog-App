const Blog = require("../models/Blog");
//const mongoose = require("mongoose")
const { NotFound } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const createBlog = async (req, res) => {
  const { text,title,userId } = req.body;
  const blog = await Blog.create({ userId, text, title});
  if (!blog) {
    throw new NotFound(`Blog not created by admin for userId ${userId}`);
  }
  res.status(StatusCodes.CREATED).json({blog});
};
const deleteBlog = async (req, res) => {
  const {
    params: { id:blogId },
  } = req;
  const blog = await Blog.findByIdAndDelete({ _id: blogId });
  if (!blog) {
    throw new NotFound("Blog not Found");
  }
  res.status(StatusCodes.OK).json({ msg: `Admin deleted blog with id: ${blogId}` });
};
const updateBlog = async (req, res) => {
  const {
    params: { id },
  } = req;
  const blog = await Blog.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!blog) {
    throw new NotFound("Blog not Found");
  }
  res.status(StatusCodes.OK).json({ msg: `Admin updated blog with id: ${id}` });
};
const getAll = async (req, res) => {
  const blogs = await Blog.find({}).sort("createdAt")
  res.status(StatusCodes.OK).json({ blogs, NoOfHits: blogs.length});
}
const getSingle = async (req, res) => {
  const {
    params: { id:userId },
  } = req;
  const blogs = await Blog.find({ userId});
  if (!blogs) {
    throw new NotFound("Blog not Found");
  }
  res.status(StatusCodes.OK).json({ blogs, NoOfHits: blogs.length });
};
module.exports = { deleteBlog, getAll, updateBlog, createBlog, getSingle };
