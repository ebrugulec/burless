const shortId = require('shortid');
const validUrl = require('valid-url');
const Link = require('../models/Link');
// const Click = require('../models/click');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const Click = require('../models/Click');
const { parse } = require('url');
const geoip = require('geoip-lite');
dotenv.config();
const getUserIdFromToken = require('../utils/getUserIdFromToken');

const BASE_URL = process.env.BASE_URL;

class linkController {
  static shortenLink = async (req, res, app, reqUrl) => {
    const burless_token = req.cookies.burless;
    const sessionId = req.session.id;

    const userId = await getUserIdFromToken(burless_token);
  //TODO: Add and check alias
    try {
      const linkCode = shortId.generate();
      const shortLink = `${BASE_URL}/${linkCode}`;
      let url = new Link({
        longLink: reqUrl,
        shortLink,
        linkCode,
        user: userId ? userId : null,
        session: userId ? null : sessionId,
      });
      await url.save();
      return app.render(req, res, '/index', {id: '3532'});

    } catch (err) {
      return res.status(500).json("Internal Server error " + err);
    }
  };

  static getAllLink = async (req, res) => {
    const burless = req.cookies.burless;
    if (burless) {
      const user = await getUserIdFromToken(burless);
      const links = await Link.find({"user": ObjectId('5fec735f8817ee951e90b517')});
      res.status(200).json(links);
    } else {
      // const session = req.sessionID;
      // console.log('sessi', session)
      // const links = await Link.find({"session": "B2tpkLa1m1AStfgBvlcojxsN_XycOZud"});
      Link.find({"session": 'B2tpkLa1m1AStfgBvlcojxsN_XycOZud'}, function(error, result) {
        if (error) {
          return res.json({ 'status': 422, 'error': error.toString() });
        } else {
          res.json({ 'status': 200, 'data': result });
        }
      });
    }
  };


  static getLink = async (req, res) => {
    const { id } = req.params;
    const ip = (typeof req.headers['x-forwarded-for'] === 'string'
      && req.headers['x-forwarded-for'].split(',').shift())
      || req.connection?.remoteAddress
      || req.socket?.remoteAddress
      || req.connection?.socket?.remoteAddress;

    const geo = geoip.lookup(ip);
    const country = geo && geo['country'];
    try {
      const link = await Link.findOne({ 'linkCode': id });

      if (link) {
        const referrer = req.get('Referrer');
        let totalClickCount = link.totalClickCount;
        totalClickCount++;

        let click = new Click({
          _link: link._id,
          referrer: referrer,
          country: country,
        });
        await click.save();
        await link.update({ totalClickCount });
        return res.redirect(link.longLink);
      }else {
        return res.status(400).json("Url doesn't exists.");
      }
    } catch (err) {
      //HandleCatch
      return res.status(500).json("Internal error.");
    }
  };
}

module.exports = linkController;