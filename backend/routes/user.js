const express = require("express");
const { create } = require("../controller/user");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>HELLO</h1>");
});

router.post("/create", create);


module.exports = router;
