const { hash, compare } = require("bcryptjs");

//hash password
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
};

//compare password
const comparePassword = (passwordEntered, passwordHash) => {
  return new Promise((resolve, reject) => {
    compare(passwordEntered, passwordHash, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};

module.exports = { hashPassword, comparePassword };
