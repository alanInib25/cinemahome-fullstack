const { sign, verify } = require("jsonwebtoken");

//private keys
const {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} = require("../utils/handleConfig.js");

//access token
const accessTokenSign = (payload, expired) => {
  return new Promise((resolve, reject) => {
    sign(
      payload,
      ACCESS_TOKEN_KEY,
      { expiresIn: `${expired}` },
      (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });
};
//refresh token
const refreshTokenSign = (payload, expired) => {
  return new Promise((resolve, reject) => {
    sign(
      payload,
      REFRESH_TOKEN_KEY,
      { expiresIn: `${expired}` },
      (err, token) => {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });
};
//verify access token
const verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    verify(token, ACCESS_TOKEN_KEY, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};
//verify refresh token
const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    verify(token, REFRESH_TOKEN_KEY, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

module.exports = {
  accessTokenSign,
  refreshTokenSign,
  verifyAccessToken,
  verifyRefreshToken,
};
