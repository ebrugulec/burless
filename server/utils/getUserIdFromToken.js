const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const getUserIdFromToken = async (token) => {
  if (token) {
    const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
    return decrypt.id;
  } else {
    return null
  }
};

module.exports = getUserIdFromToken;