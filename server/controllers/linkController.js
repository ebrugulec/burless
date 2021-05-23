const shortId = require('shortid');
const validUrl = require('valid-url');
const Link = require('../models/Link');
const TotalClick = require('../models/TotalClick');
// const Click = require('../models/click');
const UAParser = require('ua-parser-js');
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
const useragent = require('express-useragent');
const {
  getDatesBetweenDates,
  handleDaysForStatistic,
  handleMonthsForStatistic
} = require("../../utils");

//TODO: butun error lari ayni formatta duzenle
client.on("error", (err) => {
  console.log(err);
});
const LINK_PER_PAGE = 10;
const SEARCH_LIMIT = 5;

const BASE_URL = process.env.BASE_URL;

const usersProjection = {
  __v: false,
  session: false,
  user: false,
};

//TODO: Move mongoose query to service.
class linkController {
  static shortenLink = async (req, res, app, reqUrl) => {
    const burless = req.cookies.burless;
    const sessionId = req.sessionID;
    const userId = await getUserIdFromToken(burless);
    console.log('shortlink userId', userId)

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
            _id: "$country",
            count: {$sum: 1}
          }},
        {
          $project: {
            "country": "$_id",
            count: 1,
            "_id": 0
          }
        },
        {$sort: {"count": -1} },
        { "$limit": 5 },
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
            _id: "$city",
            count: {$sum: 1}
          }},
        {
          $project: {
            "city": "$_id",
            count: 1,
            "_id": 0
          }
        },
        {$sort: {"count": -1} },
        { "$limit": 5 },
      ]).exec()
      .then((countries) => {
        return countries;
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
            _id: "$referrer",
            count: {$sum: 1}
          }},
        {
          $project: {
            "referrer": "$_id",
            count: 1,
            "_id": 0
          }
        },
        {$sort: {"count": -1} },
        { "$limit": 5 },
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

  static getLinkClickCount = async (linkCode) => {
    // console.log('linkCode', linkCode)
    let date = new Date();
    date.setDate(date.getDate()-15);
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
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: {$sum: 1}
          }
      },
        {$sort: {"_id": 1} },
        {
          $project: {
            _id: 0,
            date: "$_id",
            count: '$count',
          }
        }
      ]).exec()
      .then((clickInfo) => {
        return handleDaysForStatistic(clickInfo);
      })
      .catch((err) => {
        return {error: err};
      });
  };

  static getLinkStatistic = async (req, res) => {
    const { id } = req.params;
    //TODO: Get Platform and browser
    //TODO: GEt link total click, created date info

    // const link = Link.find(
    //   {
    //     "linkCode": id,
    //     // user: `${ObjectId(userId)}`
    //   },
    //   usersProjection
    // );
    const link = await Link.findOne({ 'linkCode': id }, usersProjection);
    const referrers = await this.getReferrer(id);
    const countries = await this.getCountry(id);
    const cities = await this.getCity(id);
    const groupedClickInfo = await this.getLinkClickCount(id);

    return res.json({
      status: 200,
      data: {
        link,
        referrers,
        countries,
        cities,
        clickInfo: groupedClickInfo,
      }
    });
  };

  static getChartData  = async (req, res) => {
    const { id, date } = req.params;

    let clickInfo;
    if (date === 'months') {
      clickInfo = await this.getMonthlyStatistic(id);
    } else if (date === 'days') {
      clickInfo = await this.getLinkClickCount(id);
    } else {
      return res.status(500).send({
        errors: [
          {msg: "We are so sorry. We couldn't fetch data. Please try again later."}
        ]
      });
    }

    return res.json({
      status: 200,
      data: {
        clickInfo
      }
    });
  };

  static getMonthlyStatistic = async (linkCode) => {
    // let date = new Date();
    // date.setDate(date.getDate()-95);
    //TODO: must be auth
    return Click.aggregate(
      [
        {
          $match: {
            "linkCode": linkCode,
            // "createdAt": {'$gte': date}
          },
        },
        { "$group": {
            "_id": {
              "month": { "$substr": [ "$createdAt", 0, 7 ] }
            },
            "count": { "$sum": 1 }
          }
        },
        {$sort: {"_id": 1} },
        {
          $project: {
            _id: 0,
            date: "$_id.month",
            count: '$count',
          }
        }
      ]).exec()
      .then((clickInfo) => {
        return handleMonthsForStatistic(clickInfo);
      })
      .catch((err) => {
        return {error: err};
      });
  };

  static report = async (req, res) => {
    const token = req.cookies.burless;
    const sessionId = res.sessionID;
    const userId = token && await getUserIdFromToken(token);

    Promise.all([
      Link.aggregate([
        {
          $match : userId ? {user: ObjectId(userId)} : {session: sessionId},
        },
        {
          $group : {
            _id : null,
            totalClickCount : {
              $sum : "$totalClickCount"
            }
          }
        }
      ]),
      Link.find(userId ? {user: ObjectId(userId)} : {session: sessionId}).sort({totalClickCount : -1}).limit(1),
      Link.countDocuments(userId ? {user: ObjectId(userId)} : {session: sessionId}),

    ]).then( ([ totalClickCount, mostClicked, totalLinks ]) => {
      return res.json({
        status: 200,
        data: {
          message: "Fetched report links",
          totalClickCount,
          mostClicked,
          totalLinks
        }
      });
    }).catch(() => {
      return res.status(500).send({
        errors: [
          {msg: "Internal Server error "}
        ]
      });
    })
  };

  static search = async (req, res) => {
    const {linkCode} = req.query;

    const token = req.cookies.burless;
    const userId = token && await getUserIdFromToken(token);

    Link.find(
      {
        "linkCode": { "$regex": linkCode, "$options": "i" },
        user: `${ObjectId(userId)}`
      },
      usersProjection
    )
      .limit(SEARCH_LIMIT)
      .exec()
      .then((links) => {
        return res.json({
          status: 200,
          data: {
            message: "Fetched search links",
            links: links,
          }
        });
    }).catch((err) => {
        return {error: err};
      });

  }
}

module.exports = linkController;
