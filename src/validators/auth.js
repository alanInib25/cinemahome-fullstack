const { check } = require("express-validator");
const validateResult = require("../utils/handleExpressValidator.js");

const signupValidate = [
  check("username", "Invalid Username")
    .notEmpty()
    .withMessage("Username Empty")
    .isString()
    .withMessage("Username is not String")
    .isLength({ min: 2 })
    .withMessage("Username min 2 characters")
    .isLength({ max: 15 })
    .withMessage("Username max 15 characters"),
  check("email", "Invalid Email")
    .notEmpty()
    .withMessage("Email Empty")
    .isEmail()
    .withMessage("Email bad format")
    .normalizeEmail(),
  check("password", "Invalid Password")
    .notEmpty()
    .withMessage("Password Empty")
    .isString()
    .withMessage("Password is not String")
    .isLength({ min: 6 })
    .withMessage("Password min 6 characters")
    .isLength({ max: 12 })
    .withMessage("Password max 12 characters"),
  validateResult,
];

const signinValidate = [
  check("email", "Invalid Email")
    .notEmpty()
    .withMessage("Email Empty")
    .isEmail()
    .withMessage("Email bad format")
    .normalizeEmail(),
  check("password", "Invalid Password")
    .notEmpty()
    .withMessage("Password Empty")
    .isString()
    .withMessage("Password is not String")
    .isLength({ min: 6 })
    .withMessage("Password min 6 characters")
    .isLength({ max: 12 })
    .withMessage("Password max 12 characters"),
  validateResult,
];

const tokenValidate = [
  check("token")
    .notEmpty()
    .withMessage("Invalid Token")
    .isJWT()
    .withMessage("Invalid Token JWT"),
  validateResult,
];

module.exports = { signupValidate, signinValidate, tokenValidate };
