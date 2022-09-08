const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      minLength: [10, "title length must be at least 3"],
    },
    text: {
      type: String,
      required: [true, "Please provide text"],
      minLength: [100, "text length must be at least 100"],
      unique: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    username: {
    type: String,
    required: [true, "Please provide name"],
    minLength: [3, "Username length must be at least 3"],
    maxLength: [40, "Username length must be at most 40"],
  },
  },
  //options
  { timestamps: true }
);

module.exports = mongoose.model("Blog",BlogSchema)