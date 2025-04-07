const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { customError } = require("../utils/helper");
const { MSG_CONSTANTS } = require("../utils/constants");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

async function isAuthenticated(req, res, next) {
  try {
    const auth_token = req.header("Authorization");
    if (!auth_token)
      throw customError(
        MSG_CONSTANTS.TOKEN_MISSING,
        StatusCodes.UNAUTHORIZED
      );

    const token = auth_token.split(" ")[1];
    if (!token)
      throw customError(MSG_CONSTANTS.INVALID_TOKEN, StatusCodes.UNAUTHORIZED);

    const decoded = jwt.verify(token, jwtSecretKey);
    if (!decoded)
      throw customError(MSG_CONSTANTS.INVALID_TOKEN, StatusCodes.UNAUTHORIZED);

    // Fetch user and attach to request object
    req.user = await User.findById(decoded.id).select("name email");
    if (!req.user)
      throw customError(MSG_CONSTANTS.INVALID_TOKEN, StatusCodes.UNAUTHORIZED);

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { isAuthenticated };
