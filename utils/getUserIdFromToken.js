const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const getUserIdFromToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET, function (err, decrypt) {
    if(err) {
      return false
    } else {
      return decrypt.id
    }
  });
};

module.exports = getUserIdFromToken;
