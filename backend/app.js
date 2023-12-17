const express = require("express");
const userRouter = require("./routes/user");

const app = express();

//app.use(): tell app to use a specific middleware function at a particular stage.
//express.json(): a middleware function to ask express parse json request.
app.use(express.json());

app.use("/api/user", userRouter);

app.get("/about", (req, res) => {
  res.send("<h1>Hello I am from backend!</h1>");
});

app.listen(1108, () => {
  console.log("the port is listening on port 1108");
});
