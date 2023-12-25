const nodemailer = require("nodemailer");

exports.generateOTP = (otpLength) => {
  let OTP = "";
  for (let i = 1; i <= otpLength; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  return OTP;
};

exports.generateMailTransporter = () =>
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "49fb4679fc1c62",
      pass: "d846c4b173b105",
    },
  });
