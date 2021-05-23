const { validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generateToken = require('../../utils/generateToken');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User");
const Link = require("../models/Link");
const getUserIdFromToken = require('../../utils/getUserIdFromToken');

//TODO: check response and return data
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
        return res.status(409).json({
          errors: [
            {msg: "User Already Exists"}
          ]
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
      res.send({
        status: 200,
        email: user.email,
        username: user.username
      });
    } catch (err) {
      res.status(500).send({
        errors: [
          {msg: "We are so sorry. There was an error. Please try again later."}
        ]
      });
    }
  };

  static signIn = async (req, res) => {
    const sessionId = req.sessionID;
    const errors = validationResult(req);

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

      if (!user) {
        return res.status(404).json({
          errors: [
            {msg: "User Not Exist"}
          ]
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({
          errors: [
            {msg: "Incorrect Password!"}
          ]
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
      res.send({
        status: 200,
        email: user.email,
        username: user.username
      });
    } catch (e) {
      res.status(500).send({
        errors: [
          {msg: "We are so sorry. There was an error. Please try again later."}
        ]
      });
    }
  };

  static resetPassword = async (req, res) => {
    return res.json({
      status: 200,
    });
  };

  static getUser = async (req, res) => {
    const burless_token = req.cookies.burless;

    const userId = await getUserIdFromToken(burless_token);
    try {
      const user = await User.findOne({ '_id': userId });
      return res.json({ status: 200,
        data: {
          email: user.email,
          username: user.username
        }
      });
    } catch (e) {
      res.status(500).send({
        errors: [
          {msg: "We are so sorry. There was an error. Please try again later."}
        ]
      });
    }
  };

  static async updateUserLinksWithSession(sessionId, userId) {
    await Link.updateMany(
      {session: sessionId},
      {"user": userId},
      {upsert: true});
  }
}

module.exports = userController;
