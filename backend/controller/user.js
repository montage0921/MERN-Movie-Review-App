const User = require("../models/user.js");

exports.create = async (req, res) => {
  //req.body: access json format request in backend.
  const { name, email, password } = req.body;

  //create a new user use the user model
  //similar as OOP
  const newUser = new User({ name, email, password });

  //save the new user to mongoDB database
  //it's an async step
  await newUser.save();

  //res.json(): send a json format response to front end
  res.json({
    user: newUser,
  });
};
