const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/passwordResetToken");
const { sendError } = require("../utils/helper");
const user = require("../models/user");

exports.isValidPassResetToken = async (req, res, next) => {
  const { token, userId } = req.body;

  if (!token.trim() || !isValidObjectId(userId))
    return sendError(res, "Unauthorized access, invalid request");

  const resetToken = await PasswordResetToken.findOne({ owner: userId });

  if (!resetToken) return sendError(res, "Invalid request!");

  const isMatched = await resetToken.compareToken(token);

  if (!isMatched) return sendError(res, "Unauthorized access, invalid request");

  req.resetToken = resetToken;

  next();
};
