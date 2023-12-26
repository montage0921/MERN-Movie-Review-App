const express = require("express");

const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  resetPassword,
} = require("../controller/user");

const { useValidator, validate } = require("../middlewares/validators");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>HELLO</h1>");
});

router.post("/create", useValidator, validate, create);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.post("/reset-password", resetPassword);

module.exports = router;
