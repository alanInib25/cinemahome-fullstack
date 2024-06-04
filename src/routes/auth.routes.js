const express = require("express");
const authRoutes = express.Router();
const { authSignin, authSignup, authSignout, authForgotPassword, authResetPassword, authVerify } = require("../controller/auth.controller.js");
const { authRequire } = require("../middlewares/JWTMiddleware.js");
const { signupValidate, signinValidate, tokenValidate } = require("../validators/auth.js");

authRoutes.post("/signup", signupValidate, authSignup);
authRoutes.post("/signin", signinValidate, authSignin);
authRoutes.post("/signout", tokenValidate, authRequire, authSignout);
authRoutes.post("/forgotPassword", authForgotPassword);
authRoutes.post("/resetPassword/:token", tokenValidate, authResetPassword);
authRoutes.get("/verify", tokenValidate, authRequire, authVerify);

module.exports = authRoutes;
