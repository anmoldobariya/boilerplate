const { StatusCodes } = require("http-status-codes");
const { User } = require("../models/user");
const {
  generateAuthToken,
  encryptPassword,
  comparePassword,
  customError
} = require("../utils/helper");
const { MSG_CONSTANTS } = require("../utils/constants");

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user)
      throw customError(MSG_CONSTANTS.USER_EXISTS, StatusCodes.BAD_REQUEST);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: await encryptPassword(password)
    });

    // Send the authentication token
    res.send({
      message: MSG_CONSTANTS.REGISTER_SUCCESS,
      token: generateAuthToken(newUser)
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user)
      throw customError(MSG_CONSTANTS.INVALID_CRED, StatusCodes.BAD_REQUEST);

    // Validate the password
    if (!(await comparePassword(password, user.password)))
      throw customError(MSG_CONSTANTS.INVALID_CRED, StatusCodes.BAD_REQUEST);

    // Send the authentication token
    res.send({
      message: MSG_CONSTANTS.LOGIN_SUCCESS,
      token: generateAuthToken(user)
    });
  } catch (error) {
    next(error);
  }
};

module.exports.profile = (req, res, next) => {
  try {
    const user = req.user;

    if (!user)
      throw customError(MSG_CONSTANTS.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);

    res.send(user);
  } catch (error) {
    next(error);
  }
};
