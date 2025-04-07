// Import controllers
const { register, login, profile } = require("../controller/auth");

// Import middlewares
const { isAuthenticated } = require("../middleware/auth");
const { validateBody } = require("../middleware/validator");

// Import validation schemas
const { register_schema, login_schema } = require("../utils/schema/auth");

// Initialize router
const router = require("express").Router();

// Routes
// User registration
router.post("/register", validateBody(register_schema), register);

// User login
router.post("/login", validateBody(login_schema), login);

// Get user profile
router.get("/profile", isAuthenticated, profile);

// Export router
module.exports = router;
