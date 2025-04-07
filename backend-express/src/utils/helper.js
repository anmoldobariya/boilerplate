const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function customError(message, statusCode = 500) {
  const error = new Error(message);
  error.status = statusCode;
  return error;
}

// Destructure environment variables for better readability
const { JWT_SECRET_KEY } = process.env;
if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

const generateAuthToken = (user) => {
  return jwt.sign(
    { id: user._id }, // Payload
    JWT_SECRET_KEY, // Secret key
    { expiresIn: "1h" } // Token expiration
  );
};

const encryptPassword = async (pass) => bcrypt.hash(pass, 10);

const comparePassword = async (pass, hashPass) =>
  bcrypt.compare(pass, hashPass);

// Export utility functions
module.exports = { customError, generateAuthToken, encryptPassword, comparePassword };
