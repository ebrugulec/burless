const express = require('express')
const router = express.Router()
const { check } = require('express-validator/check')
const auth = require('../middleware/auth')
const LinkController = require('../controllers/linkController')
const UserController = require('../controllers/userController')

router.get('/links/statistic/totalInfo', LinkController.getLinkTotalInfo);

router.get('/users/me', UserController.getUser);
router.get('/links/statistic/:id/:date', LinkController.getChartData);
router.delete('/links/:urlId', LinkController.deleteUrl);
router.get('/links', LinkController.getAllLink);
router.post('/links', LinkController.createNewLinkWithCustomName);
router.post('/users/reset-password', UserController.resetPassword);

//must be auth
router.get('/links/country/:id', LinkController.getCountry);
router.get('/links/referrer/:id', LinkController.getReferrer);
router.get('/links/search', LinkController.search);

router.get('/links/report', LinkController.report);
// router.get('/links/statistic/:id', LinkController.getLinkClickCount);
router.get('/links/statistic/:id', LinkController.getLinkStatistic);

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
);

router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
      min: 6,
    }),
  ],
  UserController.signIn
);

router.post('/signout', (req, res) => {
  req.session.destroy((err) => {
    //TODO: Handle err
    res.clearCookie("burless");
    res.clearCookie("burless_session");
    res.redirect('/')
  });
});

module.exports = router;
