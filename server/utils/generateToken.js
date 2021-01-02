const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const generateToken = async (res, payload) => {
  const expiration = process.env.DB_ENV === 'test' ? 604800000 : 604800000;
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.DB_ENV === 'test' ? '1d' : '7d',
  });
  res.cookie('burless', token, {
    expires: new Date(Date.now() + expiration),
    secure: false, // set to true if your using https
    httpOnly: true,
  });
  console.log('cookie', res.cookie)

  return res.status(200).json("Ok");
};

module.exports = generateToken;