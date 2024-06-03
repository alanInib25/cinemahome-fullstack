const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  URL_DB_CONN: process.env.URL_DB_CONN,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
  NODEMAILER_EMAIL_PASS: process.env.NODEMAILER_EMAIL_PASS,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
}