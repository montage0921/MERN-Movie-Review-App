exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

// exports.sendMessage = (res, message, statusCode = 201) => {
//   res.status(statusCode).json({ message });
// };
