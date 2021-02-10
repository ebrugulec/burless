const { validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generateToken = require('../utils/generateToken');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User");
const Link = require("../models/Link");

class userController {
  static signUp = async (req, res) => {
    const sessionId = req.sessionID;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      username,
      email,
      password
    } = req.body;

    try {

      let user = await User.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new User({
        username,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        id: user.id
      };

      await this.updateUserLinksWithSession(sessionId, user.id);
      req.session.regenerate((err) => {
        if(err) {
          console.error(err);
        }
      });
      await generateToken(res, payload);
      res.json({ 'status': 200 });
    } catch (err) {
      res.status(500).send("Error in Saving");
    }
  };

  static signIn = async (req, res) => {
    const sessionId = req.sessionID;
    const errors = validationResult(req);
    console.log('signIn')

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });

      if (!user)
        return res.status(404).json({
          data: {message: "User Not Exist"}
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(404).json({
          data: {message: "Incorrect Password !"}
        });

      const payload = {
        id: user.id
      };

      await this.updateUserLinksWithSession(sessionId, user.id);
      req.session.regenerate((err) => {
        if(err) {
          console.log(err);
        }
      });

      await generateToken(res, payload);
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  };

  static getUser = async (req, res) => {
  };

  static async updateUserLinksWithSession(sessionId, userId) {
    await Link.updateMany(
      {session: sessionId},
      {"user": userId},
      {upsert: true});
  }
}

module.exports = userController;