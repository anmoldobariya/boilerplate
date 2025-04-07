const { StatusCodes } = require("http-status-codes");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: error.details[0].message });
    next();
  };
}

module.exports = {
  validateBody
};
