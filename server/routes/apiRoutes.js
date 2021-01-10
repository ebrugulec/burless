const express = require('express');
const router = express.Router();
const { check } = require("express-validator/check");
const auth = require('../middleware/auth');
const LinkController = require("../controllers/linkController");
const UserController = require("../controllers/userController");

// const request = require('superagent');
// const async = require('async');

// router.delete('/links/:urlId', LinkController.deleteUrl);
// router.get('/links/statistic/:urlId', LinkController.getUrlClickCount);
router.get('/links/', LinkController.getAllLink);

//must be auth
router.get('/links/country/:id', LinkController.getCountry);
router.get('/links/referrer/:id', LinkController.getReferrer);
router.get('/links/statistic/:id', LinkController.getLinkClickCount);

router.get('/me', auth, UserController.getUser);
router.post('/register', [
  check("username", "Please Enter a Valid Username")
    .not()
    .isEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({
    min: 6
  })
], UserController.signUp);

router.post('/login', [
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({
    min: 6
  })
], UserController.signIn);

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {

    //TODO: Handle err
    res.redirect('/')
  })
})

module.exports = router;