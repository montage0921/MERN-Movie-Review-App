const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const passwordResetTokenSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  token: {
    type: String,
    required: true,
  },

  createAt: {
    type: Date,
    expires: 3600, //one hour
    default: Date.now(),
  },
});

passwordResetTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, 10);
  }

  next();
});

//schema.method is the way to create custom method for a model
passwordResetTokenSchema.methods.compareToken = async function (token) {
  //bcrypt.compare is used to compare user-entered OTP and the OTP stored in the EmailVerificationToken database
  const result = await bcrypt.compare(token, this.token);
  return result;
};

module.exports = mongoose.model("passwordResetToken", passwordResetTokenSchema);
