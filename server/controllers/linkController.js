const shortId = require('shortid');
const validUrl = require('valid-url');
const Link = require('../models/Link');
// const Click = require('../models/click');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { parse } = require('url');
dotenv.config();
const getUserIdFromToken = require('../utils/getUserIdFromToken');

const BASE_URL = process.env.BASE_URL;

class linkController {
  static shortenLink = async (req, res, app, reqUrl) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    const burless_token = req.cookies.burless;
    const sessionId = req.session.id;

    const userId = await getUserIdFromToken(burless_token);
  //TODO: Add and check alias
      try {
        // const urlCode = shortId.generate();
        // const shortLink = `${BASE_URL}/${urlCode}`;
        // let url = new Link({
        //   link: reqUrl,
        //   shortLink,
        //   urlCode,
        //   user: userId ? userId : null,
        //   session: userId ? null : sessionId,
        // });
        // await url.save();
        return app.render(req, res, '/index', {id: '3532'});

      } catch (err) {
        return res.status(500).json("Internal Server error " + err);
      }

  };

  static getAllLink = async (req, res) => {
    const burless = req.cookies.burless;
    if (burless) {
      const user = await getUserIdFromToken(burless);
      const links = await Link.find({"session": "B2tpkLa1m1AStfgBvlcojxsN_XycOZud"});
      res.status(200).json(links);
    } else {
      // const session = req.sessionID;
      // console.log('sessi', session)
      // const links = await Link.find({"session": "B2tpkLa1m1AStfgBvlcojxsN_XycOZud"});
      // console.log('links', links)
      // res.status(200).json(links);

      const links = await Link.find({"session": "B2tpkLa1m1AStfgBvlcojxsN_XycOZud"});
      res.status(200).json(links);
    }
  };


  static getLink = (req, res) => {
    console.log('getUrl')
    res.redirect('https://stackoverflow.com/questions/4643142/regex-to-test-if-string-begins-with-http-or-https')

    // const { link } = req.params;
    // console.log('link', link)
    // try {
    //   const url = await Link.findOne({ 'urlCode': link });
    //
    //   if (url) {
    //     let totalClickCount = url.totalClickCount;
    //     totalClickCount++;
    //     //
    //     // let click = new Click({
    //     //   _link: urlId
    //     // });
    //     // await click.save();
    //     await url.update({ totalClickCount });
    //     console.log('url', url.link)
    //     return res.redirect(url.link);
    //   }else {
    //     return res.status(400).json("Url doesn't exists.");
    //   }
    // } catch (err) {
    //   console.log('er', err)
    //   return res.status(500).json("Internal error.");
    // }
  };
}

module.exports = linkController;