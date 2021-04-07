const shortId = require('shortid');
const validUrl = require('valid-url');
const Link = require('../models/Link');
const TotalClick = require('../models/TotalClick');
// const Click = require('../models/click');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const Click = require('../models/Click');
const { parse } = require('url');
const geoip = require('geoip-lite');
const redis = require("redis");
dotenv.config();
const getUserIdFromToken = require('../../utils/getUserIdFromToken');
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);

client.on("error", (err) => {
  console.log(err);
});
const LINK_PER_PAGE = 10;

const BASE_URL = process.env.BASE_URL;

//TODO: Move mongoose query to service.
class linkController {
  static shortenLink = async (req, res, app, reqUrl) => {
    const burless_token = req.cookies.burless;
    const sessionId = req.sessionID;

    const userId = await getUserIdFromToken(burless_token);

    //TODO: Block with ip address
    // const current_user = userId || sessionId;
    // client.get(current_user, function(err, reply) {
    //   if (!reply) {
    //     if (current_user) {
    //       client.setex(current_user, 3600, 1);
    //     }
    //   } else if (reply >= 3) {
    //     return app.render(req, res, '/error');
    //   } else {
    //     client.incr(current_user);
    //   }
    // });

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
      const a = await url.save();
      console.log('id: \'3532\'', a._id )
      return app.render(req, res, '/index', {id: JSON.stringify(a._id)});

    } catch (err) {
      return res.status(500).json("Internal Server error " + err);
    }
  };

  static getAllLink = async (req, res) => {
    const token = req.cookies.burless;
    console.log('getAllLink', req.cookies)
    const sessionId = req.sessionID;

    // if (!!token && !!session) {
    //   //TODO: handle here
    //   return true
    // }

    const curPage = req.query.page || 1;
    const userId = token && await getUserIdFromToken(token);
    const totalLinksCount = await Link.countDocuments(userId ? {user: ObjectId(userId)} : {session: sessionId});
    const getAllLinkResponse = await this.getAllLinksWithTokenOrSession(userId, sessionId, curPage);
    console.log('totalLinksCount', totalLinksCount)
    if (!!getAllLinkResponse.error) {
      console.log('err', getAllLinkResponse.error)
    } else {
      res.json({
        status: 200,
        data: {
          message: "Fetched links",
          links: getAllLinkResponse,
          curPage: curPage,
          maxPage: Math.ceil(totalLinksCount / LINK_PER_PAGE),
        }
      });
    }
    console.log('LINKS', getAllLinkResponse)
    if (token) {
      const userId = await getUserIdFromToken(token);
      const totalLinksForUser = await Link.countDocuments({session});
      Link.find({"user": ObjectId(userId)})
        .limit(perPage)
        .skip(perPage * page)
        .sort([['createdAt', -1]])
        .exec(function(err, result) {
          if (err) {
            return res.json({ 'status': 422, 'error': error.toString() });
          } else {
            res.json(
              {
                status: 200,
                data: {
                  message: "Fetched links",
                  links: result,
                  curPage: curPage,
                  maxPage: Math.ceil(totalLinksForUser / perPage),
                }
              });
          }
        })
    } else {
      const session = req.sessionID;

    }
  };

  static getAllLinksWithTokenOrSession (userId, sessionId, curPage){
    const usersProjection = {
      __v: false,
      session: false,
      user: false,
      createdAt: false
    };
    return Link.find(userId ? {user: ObjectId(userId)} : {session: sessionId}, usersProjection)
      .limit(LINK_PER_PAGE)
      .skip((curPage - 1) * LINK_PER_PAGE)
      .sort({createdAt: -1})
      .exec()
      .then((links) => {
        return links;
      })
      .catch((err) => {
        return {error: err};
      });
  }

  static getLink = (req, res, app) => {
    console.log('getLink')
    const { id } = req.params;
    try {
      client.get(id, async (err, link) => {
        if (err) throw err;
        if (link) {
          res.redirect(JSON.parse(link));
          this.saveLinkAndStatisticInfo(req, id)
        } else {
          const link = await Link.findOne({ 'linkCode': id });
          if (link) {
            client.setex(id, 600, JSON.stringify(link.longLink));
            console.log(' db redis');
            this.saveLinkAndStatisticInfo(req, id)
            res.redirect(link.longLink);
          } else {
            return app.render(req, res, '/error')
          }
          //TODO: Handle Url doesn't exists.
        }

      });
    } catch (err) {
      //HandleCatch
      return res.status(500).json("Internal error.");
    }
  };

  static saveLinkAndStatisticInfo = async (req, linkCode) => {
    console.log('saveLinkAndStatisticInfo');
    const link = await Link.findOne({ 'linkCode': linkCode });
    if (link) {
      const parseIp = (req) =>
        (typeof req.headers['x-forwarded-for'] === 'string'
          && req.headers['x-forwarded-for'].split(',').shift())
        || (req.connection && req.connection.remoteAddress)
        || (req.socket && req.socket.remoteAddress)
        || (req.connection && req.connection.socket && req.connection.socket.remoteAddress);

      const geo = geoip.lookup(parseIp(req));
      const country = geo && geo['country'];
      const referrer = req.get('Referrer');
      let totalClickCount = link.totalClickCount;
      totalClickCount++;

      let click = new Click({
        _link: link._id,
        referrer: referrer,
        country: country,
      });
      await click.save();
      await link.update({totalClickCount});
    }
  };

  static getCountry  = async (urlId) => {
    return Click.aggregate(
      [
        {
          $match: {
            "_link": ObjectId(urlId),
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
      ]).exec()
      .then((countries) => {
        return countries;
      })
      .catch((err) => {
        return {error: err};
      });
  };

  static getReferrer  = async (urlId) => {
    return Click.aggregate(
      [
        {
          $match: {
            "_link": ObjectId(urlId),
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
      ]).exec()
      .then((referrers) => {
        return referrers;
      })
      .catch((err) => {
        return {error: err};
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

  static getLinkTotalInfo = async (req, res) => {
    console.log('getLinkTotalInfo', req.cookies)
    //User'in bilgileri ile total info'u gormeli.
    const userId = 1;

    Link.aggregate([
      {
        $match : {"user": ObjectId("5fe9088de4828d65f0afa941") },
      },
      {
        $group : {
          _id : null,
          total : {
            $sum : "$totalClickCount"
          }
        }
      }
    ]).exec(function(err, result){
      if (err) {
        console.log('Error Fetching model');
        console.log(err);
      } else {
        const findQuery = Link.find({"user": ObjectId("5fe9088de4828d65f0afa941")}).sort({totalClickCount : -1}).limit(1);
        findQuery.exec(function(err, maxResult){
          if (err) {return err;}
          const totalLinksQ = Link.countDocuments({"user": ObjectId("5fe9088de4828d65f0afa941")});
          totalLinksQ.exec(function(err, totalLinks){
            if (err) {return err;}
            return res.json({ 'status': 200, 'data': totalLinks });
          });
        });
      }});
  };

  static getLinkClickCount = async (urlId) => {
    // let date = new Date();
    // date.setDate(date.getDate()-1);
    //TODO: Get last 1 month data
    return Click.aggregate(
      [
        {
          $match: {
            "_link": ObjectId(urlId),
            // "createdAt": {'$gte': date}
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
        {$sort: {"date": 1} },
      ]).exec()
      .then((clickInfo) => {
        return clickInfo;
      })
      .catch((err) => {
        return {error: err};
      });
  };

  static getLinkStatistic = async (req, res) => {
    const { urlId } = req.params;
    const sessionId = req.sessionID;
    const token = req.cookies.burless;
    //TODO: Get Platform and browser
    //TODO: GEt link total click, created date info

    const referrers = await this.getReferrer(urlId);
    const countries = await this.getCountry(urlId);
    const groupedClickInfo = await this.getLinkClickCount(urlId);
    console.log('referrers', referrers)
    console.log('countries', countries)
    console.log('getGroupedClickInfo', groupedClickInfo)
  }
}

module.exports = linkController;
