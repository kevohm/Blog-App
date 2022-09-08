const express = require("express");
const router = express.Router()
const {
  createBlog,
  deleteBlog,
  updateBlog,
  getAllBlogs,
  getSingleBlog,
} = require("../controllers/blog");

router.route('/').get(getAllBlogs).post(createBlog)
router.route('/:id').get(getSingleBlog).delete(deleteBlog).patch(updateBlog)

module.exports = router