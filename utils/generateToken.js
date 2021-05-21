const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generateToken = async (res, payload) => {
  const expiration = 3600 * 1000 * 24 * 365 * 10;

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1y',
  });

  res.cookie('burless', token, {
    expires: new Date(Date.now() + expiration),
    secure: true,
    httpOnly: true,
  });

  return true
};

module.exports = generateToken
