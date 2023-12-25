const express = require("express");

const { create, verifyEmail } = require("../controller/user");
const { useValidator, validate } = require("../middlewares/validators");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>HELLO</h1>");
});

router.post("/create", useValidator, validate, create);
router.post("/verify-email", verifyEmail);

module.exports = router;
