const express = require("express");
const router = express.Router();
const {
  updateBlog,
  getAll,
  deleteBlog,
  createBlog,
  getSingle,
} = require("../controllers/adminBlog");

//admin side only
router.route("/").get(getAll).post(createBlog);
router.route("/:id").get(getSingle).delete(deleteBlog).patch(updateBlog);

module.exports = router;
