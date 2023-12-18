const express = require("express");

const { create } = require("../controller/user");
const { useValidator, validate } = require("../middlewares/validators");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>HELLO</h1>");
});

router.post("/create", useValidator, validate, create);

module.exports = router;
