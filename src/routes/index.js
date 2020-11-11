const authcontroller = require("../controllers/authController");

const router = require("express").Router();

// Auth Routes
router.post("/signup", authcontroller.signup);

module.exports = router;