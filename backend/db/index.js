const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://nicaiwojiaosha:nicaiwojiaosha1.A@moviereviewapp.f9hhksl.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db is connected!");
  })
  .catch((ex) => {
    console.log(`db connection is failed: ${ex}`);
  });
