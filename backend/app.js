const express = require("express");
const userRouter = require("./routes/user");

const app = express();

app.use('/api/user',userRouter);

app.listen(1108, () => {
  console.log("the port is listening on port 1108");
});
