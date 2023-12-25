const User = require("../models/user.js");
const EmailVerificationToken = require("../models/emailVerificationToken.js");
const nodemailer = require("nodemailer");
const { isValidObjectId } = require("mongoose");
const { generateOTP, generateMailTransporter } = require("../utils/mail.js");
const { sendError } = require("../utils/helper.js");

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
