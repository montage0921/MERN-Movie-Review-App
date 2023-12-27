const express = require("express");

const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
} = require("../controller/user");

const {
  useValidator,
  validate,
  passwordValidator,
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

module.exports = router;
