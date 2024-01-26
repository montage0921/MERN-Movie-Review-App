require("dotenv").config();
require("express-async-errors");

const express = require("express");
require(`./db`);
const userRouter = require("./routes/user");

const mongoose = require("mongoose");
const { errorHandler } = require("./middlewares/error");
const cors = require("cors");
const { handleNotFound } = require("./utils/helper");

const app = express();

app.use(cors());

//app.use(): tell app to use a specific middleware function at a particular stage.
//express.json(): a middleware function to ask express parse json request.
app.use(express.json());

app.use("/api/user", userRouter);

//handle 404 error
app.use("/*", handleNotFound);

//error handling method
//need to add at the end of the controllers that use it
app.use(errorHandler);

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
