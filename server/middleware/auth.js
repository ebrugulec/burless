const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const auth = async (req, res, next) => {
  const burless_token = req.cookies.burless || '';
  try {
    if (!burless_token) {
      return res.status(401).json('You need to Login')
    }
    const decrypt = await jwt.verify(burless_token, process.env.JWT_SECRET);
    req.user = {
      id: decrypt.id,
    };
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

module.exports = auth;