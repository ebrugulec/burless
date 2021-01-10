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
    console.log('req.query.page', req.query.page)

    const perPage = 3;
    const curPage = req.query.page || 1;

    // if (burless) {
      if (false) {
      const userId = await getUserIdFromToken(burless);

      Link.find({"user": ObjectId(userId)})
        // .limit(perPage)
        // .skip(perPage * page)
        .sort([['createdAt', -1]])

        .exec(function(err, result) {
          if (err) {
            return res.json({ 'status': 422, 'error': error.toString() });
          } else {
            res.json({ 'status': 200, 'data': result });
          }
        })
    } else {
      const session = req.sessionID;
      const totalLinks = await Link.countDocuments({session: "zvWvMADgKdOLymj-pIDz_BDfJia-HPvu"});
      Link.find({session: "zvWvMADgKdOLymj-pIDz_BDfJia-HPvu"})
        .limit(perPage)
        .skip((curPage - 1) * perPage)
        .sort({createdAt: -1})
        .exec(function(err, result) {
          if (err) {
            return res.json({ 'status': 422, 'error': error.toString() });
          } else {
            res.json(
              {
                message: "Fetched links",
                status: 200,
                links: result,
                curPage: curPage,
                maxPage: Math.ceil(totalLinks / perPage),
              });
          }
        })
    }
  };

  static getLink = async (req, res) => {
    const { id } = req.params;
    const parseIp = (req) =>
      (typeof req.headers['x-forwarded-for'] === 'string'
        && req.headers['x-forwarded-for'].split(',').shift())
      || (req.connection && req.connection.remoteAddress)
      || (req.socket && req.socket.remoteAddress)
      || (req.connection && req.connection.socket && req.connection.socket.remoteAddress);

    const geo = geoip.lookup(parseIp(req));
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

  static getCountry  = async (req, res) => {
    // Yalnizca user'lar istatistiklere ulasabilecek.
    const { id } = req.params;

    Click.aggregate(
      [
        {
          $match: {
            "_link": ObjectId(id),
          },
        },
        {$group: {
            _id: {
              country: "$country",
            },
            count: {$sum: 1}
          }},
        {$sort: {"count": -1} },
        { "$limit": 10 },
      ]).exec(function(err, result){
      if (err) {
        console.log('Error Fetching model');
        console.log(err);
      } else {
        return res.json({ 'status': 200, 'data': result });
      }
    });
  };

  static getReferrer  = async (req, res) => {
    // Yalnizca user'lar istatistiklere ulasabilecek.
    const { id } = req.params;

    Click.aggregate(
      [
        {
          $match: {
            "_link": ObjectId(id),
            "referrer": {
              "$exists": true,
              "$ne": null
            }
          },
        },
        {$group: {
            _id: {
              referrer: "$referrer",
            },
            count: {$sum: 1}
          }},
        {$sort: {"count": -1} },
        { "$limit": 10 },
      ]).exec(function(err, result){
      if (err) {
        console.log('Error Fetching model');
        console.log(err);
      } else {
        return res.json({ 'status': 200, 'data': result });
      }
    });
  };

  static deleteUrl = async (req, res) => {
    const { urlId } = req.params;
    try {
      Link.deleteOne({ '_id': urlId }, function (err) {
        if(!err) {
          return res.status(204).json("Deleted");
        } else {
          return res.status(400).json("Url doesn't exists.");
        }
      });
    } catch (e) {
      return res.status(500).json("Internal error.");
    }
  };

  static getLinkClickCount = async (req, res) => {
    const { id } = req.params;
    //TODO: Remove query this controller
    let date = new Date();
    date.setDate(date.getDate()-1);
    Click.aggregate(
      [
        {
          $match: {
            "_link": ObjectId(id),
            "createdAt": {'$gte': date}
          },
        },
        {$group: {
            _id: {
              year: {$year: "$createdAt"},
              month: {$month: "$createdAt"},
              day: {$dayOfMonth: "$createdAt"}
            },
            count: {$sum: 1}
          }},
        {$project: {
            date: "$_id",
            count: 1,
            _id: 0
          }},
        {$sort: {"date": 1} }
      ]).exec(function(err, result){
      if (err) {
        console.log('Error Fetching model');
        console.log(err);
      } else {
        console.log(result);
        return res.json({ 'status': 200, 'data': result });
      }
    });
  }
}

module.exports = linkController;