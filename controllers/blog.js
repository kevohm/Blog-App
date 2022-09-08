const Blog = require("../models/Blog");
const User = require('../models/User');
const moment = require('moment')
const { NotFound, BadRequest, NotAuthorized } = require("../errors/index");

const sortHandle = (sort, sortData) => {
  if (sortData === "createdAt asc") {
    sort.createdAt = 1;
  }
  if (sortData === "updatedAt desc") {
    sort.updatedAt = -1;
  }
  if (sortData === "updatedAt asc") {
    sort.updatedAt = 1;
  }
  if (sortData === "text desc") {
    sort.text = -1;
  }
  if (sortData === "text asc") {
    sort.text = 1;
  }
  if (sortData === "title desc") {
    sort.title = -1;
  }
  if (sortData === "title asc") {
    sort.title = 1;
  }
  if (sort.length === 0) {
    sort.createdAt = -1;
  }
}
const getAllBlogs = async (req, res) => {
  const {
    user: { userId },
    query: { page, limit, searchQuery, username, sortQuery},
  } = req;
  let queryData = {};
  //console.log(username)
  let sort = {}
  const [user] = await User.find({ username });
  if (!user && username !== "all") {
    throw new NotFound("User not found");
  }
  const allow = username === "all"
    ? false : userId === user._id.toString();

  if (username !== "all") {
    queryData.userId = user._id;
  }
  if (searchQuery) {
    queryData.title = { $regex: searchQuery, $options: "i" };
  }
  if (sortQuery) {
     sortHandle(sort, sortQuery);
  }
  let blogs = Blog.find(queryData).sort(sort);

  //pagination
  const currentLimit = Number(limit) || 20;
  const currentPage = Number(page) || 1;
  const skip = (currentPage - 1) * currentLimit;
  blogs = await blogs.skip(skip).limit(currentLimit).lean()
  blogs = blogs.map((item) => {
    let createdAt = new Date(item.createdAt);
    let updatedAt = new Date(item.updatedAt);
    createdAt = moment(createdAt, "YYYYMMDD").fromNow();
    updatedAt = moment(updatedAt).format("MMM Do YY, h:mm:ss a");
    return { ...item, createdAt, updatedAt };
  });
  //page number
  const blog_length = await Blog.countDocuments(queryData);
  const noOfPages = Math.ceil(blog_length / currentLimit);

  res.status(200).json({
    blogs,
    NoOfHits: blog_length,
    noOfPages,
    allow
  });
};

const getSingleBlog = async (req, res) => {
  const {
    params: { id: blogId },
    user: { userId },
  } = req;
  const blog = await Blog.findOne({ _id: blogId, userId });
  if (!blog) {
    throw new NotFound("Blog not found");
  }
  res.status(200).json(blog);
};

const deleteBlog = async (req, res) => {
  const {
    params: { id: blogId },
    user: { userId, username },
  } = req;
  const blog = await Blog.findByIdAndRemove({ _id: blogId, userId });
  if (!blog) {
    throw new NotFound("Blog not found");
  } else if (blog.username !== username) {
    throw new NotAuthorized("Not authorized to delete blog");
  }
  res.status(200).json({ blog, msg: `${username} deleted blog ID: ${blogId}` });
};
const updateBlog = async (req, res) => {
  const {
    body,
    user: { userId, username },
    params: { id: blogId },
  } = req;
  const blog = await Blog.findByIdAndUpdate(
    { userId, _id: blogId },
    { ...body },
    { runValidators: true, new: true }
  );
  if (!blog) {
    throw new NotFound("Blog not found");
  } else if (blog.username !== username) {
    throw new NotAuthorized("Not authorized to update blog");
  }
  res.status(200).json({ blog, msg: `${username} updated blog ID: ${blogId}` });
};
const createBlog = async (req, res) => {
  const {
    body: { text, title },
    user: { userId, username },
  } = req;
  if (!text || !title) {
    throw new BadRequest("Please provide text  and title");
  }
  if (!userId) {
    throw new NotAuthorized("Not authorized to create blog");
  }
  const blog = await Blog.create({ text, title, userId, username });
  res
    .status(201)
    .json({ blog, msg: `${username} created blog ID: ${blog._id}` });
};
module.exports = {
  createBlog,
  deleteBlog,
  updateBlog,
  getAllBlogs,
  getSingleBlog,
};
