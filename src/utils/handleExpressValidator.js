const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch ({ errors }) {
    const messages = errors.map(({ msg }) => ({ message: `${msg}` }));
    return res.status(404).json([messages]);
  }
};

module.exports = validateResult;
