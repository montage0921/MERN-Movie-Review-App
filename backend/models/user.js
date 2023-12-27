const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },

  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

//schema.method is the way to create custom method for a model
userSchema.methods.comparePassword = async function (password) {
  //bcrypt.compare is used to compare user-entered OTP and the OTP stored in the EmailVerificationToken database
  const result = await bcrypt.compare(password, this.password);
  return result;
};

module.exports = mongoose.model("User", userSchema);
