const {
  verifyAccessToken,
} = require("../utils/handleToken");

const authRequire = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const user = !token ? false : await verifyAccessToken(token);
    if (!user) return res.status(400).json([{ message: "Error credentials" }]);
    req.userId = user.id;
    next();
  } catch (error) {
    return res.status(500).json([{ message: error }]);
  }
};
module.exports = { authRequire };
