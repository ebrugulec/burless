const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const auth = async (req, res, next) => {
  const burless = req.cookies.burless || '';
  console.log('burless', burless)
  try {
    if (!burless) {
      return res.status(401).json('You need to Login')
    }
    jwt.verify(burless, process.env.JWT_SECRET, function (err, decrypt) {
      res.clearCookie("burless");
      if (err) {
        res.clearCookie("burless");
        return res.sendStatus(403)
      }
        //TODO: handle error
        req.userId = decrypt.id;
        next();
      console.log('middleware')
    })

  } catch (err) {
    return res.status(500).json(err.toString())
  }
};

module.exports = auth
