//model
const User = require("../models/user.model.js");
//handlePassword
const { hashPassword, comparePassword } = require("../utils/handlePassword.js");
//handleToken
const {
  accessTokenSign,
} = require("../utils/handleToken.js");
//noedmailer (send email)
const nodemailer = require("nodemailer");
//env
const {
  NODEMAILER_EMAIL,
  NODEMAILER_EMAIL_PASS,
} = require("../utils/handleConfig.js");
//signup
const authSignup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //valida email duplicado
    const findEmailUser = await User.findOne({ email });
    if (findEmailUser)
      return res.status(400).json([{ message: "Exist this email" }]);

    //valida username duplicado
    const findUernameUser = await User.findOne({ username });
    if (findUernameUser)
      return res.status(400).json([{ message: "Exist this username" }]);

    //hash password
    const hashedPassword = await hashPassword(password);

    //instance new User model
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    //save user instance
    await newUser.save();

    //return
    return res.status(200).json([{ message: "Successful Signup" }]);
  } catch (error) {
    return res.status(500).json([{ message: error }]);
  }
};

//signin
const authSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFounded = await User.findOne({ email });
    const checkPassword =
      userFounded === null
        ? false
        : await comparePassword(password, userFounded.password);

    if (!checkPassword)
      return res.status(400).json([{ message: "Invalid Credentials" }]);

    //genera el token
    const accessToken = await accessTokenSign(
      {
        id: userFounded.id,
      },
      "30m"
    );

    //quita password en el envio de los datos
    userFounded.set("password", undefined);
    //establece cookie con token
    res.cookie("accessToken", accessToken, { maxAge: 60000 * 30});
    res.status(200).json([userFounded]);
  } catch (error) {
    return res.status(500).json([{ message: error }]);
  }
};

//signuout
const authSignout = (req, res) => {
  try {
    res.cookie("accessToken", "", { expires: new Date(0) });
    return res.status(200).json([{ message: "Successful Signout" }]);
  } catch (error) {
    return res.status(500).json([{ message: error }]);
  }
};

//forgot password
const authForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json([{ message: "Invalid Email" }]);

    //token para url de recuperacion de contraseña
    const token = await signToken({ id: user.id });

    //noedmailer
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${NODEMAILER_EMAIL}`,
        pass: `${NODEMAILER_EMAIL_PASS}`,
      },
    });

    var mailOptions = {
      from: `${NODEMAILER_EMAIL}`,
      to: `${user.email}`,
      subject: "HOMEMOVIES - Reset Password",
      text: `http://localhost:5173/auth/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(401).json([{ message: "Email don´t send" }]);
      } else {
        return res.status(200).json([{ message: "email send" }]);
      }
    });
  } catch (error) {
    return res.status(500).json([{ message: error }]);
  }
};

//reset Password
const authResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const { id } = await verifyToken(token);
    const hash = await hashPassword(password);
    const user = await User.findByIdAndUpdate({ _id: id }, { password: hash });
    return res.status(200).json([{ message: "Update Password" }]);
  } catch (error) {
    res.status(500).json([{ message: error }]);
  }
};

//verify
const authVerify = async (req, res) => {
  try{
    const user = await User.findById({_id: req.userId});
    if(!user) return res.status(401).json([{ message: "Invalid Credentials"}]);
    user.set("password", undefined);
    return res.status(200).json([user]);
  }catch(error){
    return res.status(500).json([{ message: error}])
  }
}
module.exports = {
  authSignup,
  authSignin,
  authSignout,
  authForgotPassword,
  authResetPassword,
  authVerify,
};
