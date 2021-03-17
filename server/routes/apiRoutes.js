const express = require('express')
const router = express.Router()
const { check } = require('express-validator/check')
const auth = require('../middleware/auth')
const LinkController = require('../controllers/linkController')
const UserController = require('../controllers/userController')

router.get('/links/statistic/totalInfo', LinkController.getLinkTotalInfo)

router.get('/users/me', UserController.getUser)
router.delete('/links/:urlId', LinkController.deleteUrl)
router.get('/links', LinkController.getAllLink)
router.get('/links/statistic/:urlId', LinkController.getLinkStatistic)

//must be auth
router.get('/links/country/:id', LinkController.getCountry)
router.get('/links/referrer/:id', LinkController.getReferrer)
router.get('/links/statistic/:id', LinkController.getLinkClickCount)


router.post(
  '/signup',
  [
    check('username', 'Please Enter a Valid Username').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
      min: 6,
    }),
  ],
  UserController.signUp
)

router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
      min: 6,
    }),
  ],
  UserController.signIn
)

router.post('/signout', (req, res) => {
  req.session.destroy((err) => {
    //TODO: Handle err
    res.clearCookie("burless");
    res.clearCookie("burless_session");
    res.redirect('/')
  });
})

module.exports = router
