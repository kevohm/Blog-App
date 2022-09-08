const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide name"],
    minLength: [3, "Username length must be at least 3"],
    maxLength: [40, "Username length must be at most 40"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please fill a valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [6, "Password length must be at least 6"],
  },
  role: {
    type: String,
    enum: { values: ['member','admin'], message:'{VALUE} is not supported'},
    required: [true, "Please provide role"],
    default:"member"
  }
});

UserSchema.pre(
  "save",
  async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
  }
)
UserSchema.methods.createJWT = function () {
  return jwt.sign({userId:this._id,role:this.role,username:this.username},process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
}
UserSchema.methods.comparePass = async function (pass) {
  const match = await bcrypt.compare(pass, this.password);
  return match
}

module.exports = mongoose.model("User", UserSchema)