const express = require("express");
const authRoutes = express.Router();
const { authSignin, authSignup, authSignout, authForgotPassword, authResetPassword, authVerify } = require("../controller/auth.controller.js");
const { authRequire } = require("../middlewares/JWTMiddleware.js");

authRoutes.post("/signup", authSignup);
authRoutes.post("/signin", authSignin);
authRoutes.post("/signout", authRequire, authSignout);
authRoutes.post("/forgotPassword", authForgotPassword);
authRoutes.post("/resetPassword/:token", authResetPassword);
authRoutes.get("/verify", authRequire, authVerify);

module.exports = authRoutes;
