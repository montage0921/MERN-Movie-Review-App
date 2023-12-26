const crypto = require("crypto");

exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

exports.generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    //30 is length of the random bytes.
    //buff: a buffer object containing the generated random bytes
    crypto.randomBytes(30, (err, buff) => {
      if (err) return reject(err);

      //converts the buffer of random bytes (buff) into a string, using hexadecimal encoding.
      const buffString = buff.toString(`hex`);

      resolve(buffString);
    });
  });
};
