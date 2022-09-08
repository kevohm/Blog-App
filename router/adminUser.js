const express = require("express");
const router = express.Router();
const {
  updateUser,
  getAll,
  deleteUser,
  createUser,
  getSingle
} = require("../controllers/adminUser");

//admin side only
router.route("/").get( getAll).post(createUser);
router
  .route("/:id")
  .delete(deleteUser)
  .patch(updateUser)
  .get(getSingle);

module.exports = router;
