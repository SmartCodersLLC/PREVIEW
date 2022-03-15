const send = (
  res,
  data = false,
  message = "OK",
  error = false,
  statusCode = 200
) => {
  return res.status(statusCode).json({ data, message, error });
};

module.exports = send;
