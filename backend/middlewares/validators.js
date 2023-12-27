const { check, validationResult } = require("express-validator");

//middleware function can be an array of functions
exports.useValidator = [
  //check each field by using the below chaining methods
  //check methods and its following chaining methods DOES NOT need next()
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

exports.passwordValidator = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

//another middleware function to give response when invalid message is found
exports.validate = (req, res, next) => {
  const error = validationResult(req).array();

  if (error.length) {
    return res.json({ error: error[0].msg });
  }

  next();
};
