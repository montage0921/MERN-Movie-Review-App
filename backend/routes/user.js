const express = require("express");

//import controllers
const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  signIn,
} = require("../controller/user");

//import middleware functions
const {
  useValidator,
  validate,
  passwordValidator,
  signInValidator,
} = require("../middlewares/validators");
const { isValidPassResetToken } = require("../middlewares/user");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>HELLO</h1>");
});

router.post("/create", useValidator, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-pass-reset-token",
  isValidPassResetToken,
  sendResetPasswordTokenStatus
);
router.post(
  "/reset-password",
  passwordValidator,
  validate,
  isValidPassResetToken,
  resetPassword
);

router.post("/sign-in", signInValidator, signIn);

module.exports = router;
