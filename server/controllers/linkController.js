const shortId = require('shortid');
const validUrl = require('valid-url');
const Link = require('../models/Link');
const TotalClick = require('../models/TotalClick');
// const Click = require('../models/click');
var UAParser = require('ua-parser-js');
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
const {parseIp} = require("../../utils");
const checkUrl = require('../../utils/checkUrl');
const {checkLinkId} = require("../../utils");
const useragent = require('express-useragent')
//TODO: butun error lari ayni formatta duzenle
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

    // // Block with ip address
    // const requestIpAddress = JSON.stringify(parseIp(req));
    // client.get(requestIpAddress, function(err, reply) {
    //   if (!reply) {
    //     if (requestIpAddress) {
    //       client.setex(requestIpAddress, 3600, 1);
    //     }
    //   } else if (reply >= 300) {
    //     return app.render(req, res, '/error');
    //   } else {
    //     client.incr(requestIpAddress);
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
      const savedUrl = await url.save();
      return app.render(req, res, '/index', {id: JSON.stringify(savedUrl._id)});
    } catch (err) {
      return res.status(500).json("Internal Server error " + err);
    }
  };

  static getAllLink = async (req, res) => {
    const token = req.cookies.burless;
    const sessionId = req.sessionID;

    if (!token && !sessionId) {
     return res.status(500).send({
        errors: [
          {msg: "We are so sorry. There was an error. Please try again later."}
        ]
      });
    }

    const curPage = req.query.page || 1;
    const userId = token && await getUserIdFromToken(token);
    const totalLinksCount = await Link.countDocuments(userId ? {user: ObjectId(userId)} : {session: sessionId});
    const getAllLinkResponse = await this.getAllLinksWithTokenOrSession(userId, sessionId, curPage);

    if (!!getAllLinkResponse.error) {
      res.status(500).send({
        errors: [
          {msg: "We are so sorry. There was an error. Please try again later."}
        ]
      });
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
  };

  static createNewLinkWithCustomName = async (req, res) => {
    const burless_token = req.cookies.burless;
    const sessionId = req.sessionID;
    const userId = await getUserIdFromToken(burless_token);
    const {link, linkCode} = req.body;

    if (!checkUrl(link)) {
      return res.status(400).send({
        errors: [
          {msg: "Url could not be shortened. Check url."}
        ]
      });
    } else if (!checkLinkId(linkCode)) {
      return res.status(400).send({
        errors: [
          {msg: "Url could not be shortened. Check custom name."}
        ]
      });
    }

    const generatedLink = await Link.findOne({ linkCode });

    if (generatedLink) {
      return res.status(409).send({
        errors: [
          {msg: "That custom hash is already in use"}
        ]
      });
    } else {
      try {
        const newLinkCode = linkCode ? linkCode : shortId.generate();
        const shortLink = `${BASE_URL}/${newLinkCode}`;
        let url = new Link({
          longLink: link,
          shortLink,
          linkCode: newLinkCode,
          user: userId ? userId : null,
          session: userId ? null : sessionId,
        });
        const savedUrl = await url.save();

        const newLink = {
          _id: savedUrl._id,
          createdAt: savedUrl.createdAt,
          linkCode: savedUrl.linkCode,
          longLink: savedUrl.longLink,
          shortLink: savedUrl.shortLink,
          totalClickCount: savedUrl.totalClickCount
        };
        return res.json({
          status: 200,
          data: {
            message: "Url shortened",
            link: newLink,
          }
        });
      } catch (err) {
        return res.status(500).send({
          errors: [
            {msg: "Internal Server error "}
          ]
        });
      }
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
            this.saveLinkAndStatisticInfo(req, id)
            res.redirect(link.longLink);
          } else {
            return app.render(req, res, '/error')
          }
        }
      });
    } catch (err) {
      return app.render(req, res, '/error');
    }
  };

  static saveLinkAndStatisticInfo = async (req, linkCode) => {
    const link = await Link.findOne({ 'linkCode': linkCode });
    if (link) {
      const geo = geoip.lookup(parseIp(req));
      const country = geo && geo['country'] || 'A country in the universe';
      const city = geo && geo['city'] || 'A city in the universe';
      const referrer = req.get('Referrer');
      let totalClickCount = link.totalClickCount;
      totalClickCount++;

      let click = new Click({
        _link: link._id,
        linkCode: linkCode,
        referrer,
        country,
        city,
      });
      await click.save();
      await link.update({totalClickCount});
    }
  };

  static getCountry  = async (linkCode) => {
    return Click.aggregate(
      [
        {
          $match: {
            "linkCode": linkCode,
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

  static getCity  = async (linkCode) => {
    return Click.aggregate(
      [
        {
          $match: {
            "linkCode": linkCode,
          },
        },
        {$group: {
            _id: {
              country: "$city",
            },
            count: {$sum: 1}
          }},
        {$sort: {"count": -1} },
        { "$limit": 10 },
      ]).exec()
      .then(($cities) => {
        return $cities;
      })
      .catch((err) => {
        return {error: err};
      });
  };

  static getReferrer  = async (linkCode) => {
    console.log('getReferrer', linkCode)
    return Click.aggregate(
      [
        {
          $match: {
            "linkCode": linkCode,
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
//TODO: tarihleri asc mi desc mi getiriyor
  static getLinkClickCount = async (linkCode) => {
    let date = new Date();
    date.setDate(date.getDate()-50);
    //TODO: Get last 1 month data
    return Click.aggregate(
      [
        {
          $match: {
            "linkCode": linkCode,
            "createdAt": {'$gte': date}
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
            count: {$sum: 1}
          }
      },
        {$sort: {"_id": -1} },
        // { "$limit": 3 },
      ]).exec()
      .then((clickInfo) => {
        return clickInfo;
      })
      .catch((err) => {
        return {error: err};
      });
  };

  static getLinkStatistic = async (req, res) => {
    console.log('getLinkStatistic')
    const { id } = req.params;
    const sessionId = req.sessionID;
    const token = req.cookies.burless;
    //TODO: Get Platform and browser
    //TODO: GEt link total click, created date info

    // const referrers = await this.getReferrer(id);
    // const countries = await this.getCountry(id);
    // const cities = await this.getCity(id);
    const groupedClickInfo = await this.getLinkClickCount(id);

    return res.json({
      status: 200,
      data: {
        // referrers,
        // countries,
        // cities,
        clickInfo: groupedClickInfo
      }
    });
  }
}

module.exports = linkController;
