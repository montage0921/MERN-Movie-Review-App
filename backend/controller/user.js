//import database
const User = require("../models/user.js");
const EmailVerificationToken = require("../models/emailVerificationToken.js");
const PasswordResetToken = require("../models/passwordResetToken.js");

//import npm package
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//import methods from other files
const { isValidObjectId } = require("mongoose");
const { generateOTP, generateMailTransporter } = require("../utils/mail.js");
const { sendError, generateRandomByte } = require("../utils/helper.js");
const SendmailTransport = require("nodemailer/lib/sendmail-transport/index.js");

//create a new user
exports.create = async (req, res) => {
  //req.body: access json format request in backend.
  const { name, email, password } = req.body;

  //To prevent duplicate email address
  //status 401: unauthorized task
  const oldUser = await User.findOne({ email });

  if (oldUser) return sendError(res, "This email already exists!");

  //create a new user use the user model
  //similar as OOP
  const newUser = new User({ name, email, password });

  //save the new user to mongoDB database
  //it's an async step
  await newUser.save();

  //generate 6 digit otp
  let OTP = generateOTP(6);
  //store otp inside our db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  //send that otp to our user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@miff.com",
    to: newUser.email,
    subject: "Email Verification",
    html: `
    <p> Your verification OTP </p>
    <h1> ${OTP}</h1>
    `,
  });

  //res.json(): send a json format response to front end
  //status 201:
  res.status(201).json({
    message: "Please verify your email. OTP has been sent to your email",
  });
};

//verify email
exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  //isValidObjectId is a mongoose method
  if (!isValidObjectId(userId)) return sendError(res, "Invalid user!");

  //findById is a mongoose method
  const user = await User.findById(userId);
  if (!user) return sendError(res, "User not found!");

  //check if user is verified
  if (user.isVerified) return sendError(res, "User is already verified!");

  const token = await EmailVerificationToken.findOne({ owner: userId });

  if (!token) return sendError(res, "token not found!");

  const isMatched = await token.compareToken(OTP);

  if (!isMatched) return sendError(res, "lease submit a valid OTP");

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "49fb4679fc1c62",
      pass: "d846c4b173b105",
    },
  });

  transport.sendMail({
    from: "verification@miff.com",
    to: user.email,
    subject: "Welcome to MIFF",
    html: `
    <p> Welcome! </p>
    <h1> Welcome to MIFF website! </h1>
    `,
  });

  res.json({ message: "Your email is verified." });
};

//resend email verification token after a set of time
exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);

  if (!user) return sendError(res, "user not found!");

  if (user.isVerified)
    return sendError(res, "this email id is already verified");

  //avoid multiple tokens for a same email at the same time
  const alreadyHasToken = await EmailVerificationToken.findOne({
    owner: userId,
  });

  if (alreadyHasToken)
    return sendError(
      res,
      "Only after one hour you can request for another token"
    );

  //if no token for this email
  //generate 6 digit otp
  let OTP = generateOTP(6);
  //store otp inside our db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  //send that otp to our user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@miff.com",
    to: user.email,
    subject: "Email Verification",
    html: `
     <p> Your verification OTP </p>
     <h1> ${OTP}</h1>
     `,
  });

  res.json({ message: "OTP has been sent to your register email account" });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  //check if the email is valid
  if (!email) return sendError(res, "Email is missing!");

  const user = await User.findOne({ email });

  //check if there is an user linked to this email
  if (!user) return sendError(res, "User not found!", 404);

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });

  if (alreadyHasToken)
    return sendError(res, "Only after one hour you can request another token!");

  const token = await generateRandomByte();

  const newPasswordResetToken = await PasswordResetToken({
    owner: user._id,
    token,
  });
  await newPasswordResetToken.save();

  const resetPasswordUrl = `http://localhost:1108/reset-password?token=${token}&id=${user._id}`;

  var transport = generateMailTransporter();

  transport.sendMail({
    from: "security@miff.com",
    to: user.email,
    subject: "Reset Password Link",
    html: `
     <p> Click here to reset password </p>
     <a href=${resetPasswordUrl}> Change Password</a>
     `,
  });

  res.json({ message: "link sent to your email" });
};

exports.sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);

  const matched = await user.comparePassword(newPassword);

  if (matched)
    return sendError(
      res,
      "The new password must be different with the old one"
    );

  user.password = newPassword;
  await user.save();

  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

  const transport = generateMailTransporter();

  transport.sendMail({
    from: "security@miff.com",
    to: user.email,
    subject: "Password Reset Successfully!",
    html: `
     <h1> Password Reset Successfully! </h1>
     <p> Now you can use your new password</p>
     `,
  });

  res.json({
    message: "Password reset successfully, now you can use new password!",
  });
};
