const authcontroller = require("../controllers/authController");
const router = require("express").Router();
const { check } = require('express-validator');

// Auth Routes
router.post("/signup", [
  check('firstName', 'First Name is required').exists(),
  check('surname', 'Surname is required').exists(),
  check('email', 'Email is required or format is wrong').exists().isEmail(),
  check('bio', 'Bio is required').exists(),
  check('occupation', 'Occupation is required').exists(),
  check('dateOfBirth', 'Date Of Birth is required').exists(),
  check('password', 'Password is required').exists({min: 5})
], authcontroller.signup);

module.exports = router;