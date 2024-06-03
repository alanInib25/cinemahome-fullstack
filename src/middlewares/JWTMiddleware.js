const {
  verifyAccessToken,
} = require("../utils/handleToken");

const authRequire = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    const user = !accessToken ? false : await verifyAccessToken(accessToken);
    if (!user) return res.status(400).json([{ message: "Error credentialssssss" }]);
    req.userId = user.id;
    next();
  } catch (error) {
    return res.status(500).json([{ message: error }]);
  }
};
module.exports = { authRequire };
