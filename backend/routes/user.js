const express = require("express");
const { createUser } = require("../controller/user");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>HELLO</h1>");
});

router.get("/user-create", createUser);

module.exports = router;
