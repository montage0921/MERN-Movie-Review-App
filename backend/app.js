const express = require("express");
require(`./db`);
const userRouter = require("./routes/user");
const mongoose = require("mongoose");

const app = express();

//app.use(): tell app to use a specific middleware function at a particular stage.
//express.json(): a middleware function to ask express parse json request.
app.use(express.json());

app.use("/api/user", userRouter);

// app.post(
//   "/sign-in",
//   (req, res, next) => {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.json({ error: "password/email missing!" });

//     next();
//   },
//   (req, res) => {
//     res.send("<h1>Hello you signed-in!</h1>");
//   }
// );

app.listen(1108, () => {
  console.log("the port is listening on port 1108");
});
