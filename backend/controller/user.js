const User = require("../models/user.js");
const EmailVerificationToken = require("../models/emailVerificationToken.js");
const nodemailer = require("nodemailer");

exports.create = async (req, res) => {
  //req.body: access json format request in backend.
  const { name, email, password } = req.body;

  //To prevent duplicate email address
  //status 401: unauthorized task
  const oldUser = await User.findOne({ email });
  if (oldUser)
    return res.status(401).json({ error: "This email already exists!" });

  //create a new user use the user model
  //similar as OOP
  const newUser = new User({ name, email, password });

  //save the new user to mongoDB database
  //it's an async step
  await newUser.save();

  //generate 6 digit otp
  let OTP = "";
  for (let i = 0; i <= 5; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }
  //store otp inside our db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  //send that otp to our user
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
