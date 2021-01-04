const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const MongoDBSession = require('connect-mongodb-session')(session);
const dotenv = require("dotenv");

const checkUrl = require('./server/utils/checkUrl');
dotenv.config();

const DB = process.env.DATABASE_URI;

mongoose.connect(DB, {
  useNestedStrict: true,
  useCreateIndex: true,
})
  .then((res) => {
    console.log('Mongo Connected');
  });

const store = new MongoDBSession({
  uri: DB,
  collection: "session"
});

const linkController = require('./server/controllers/linkController')

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const pathMatch = require('path-match');
const app = next({dev});
const handle = app.getRequestHandler();
const { parse } = require('url');

const apiRoutes = require('./server/routes/apiRoutes');

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  server.use(cookieParser());

  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
  server.use(cors(corsOptions));
  server.use(express.json());

  const isDevMode = true;


// 1st change.
  if (!isDevMode) {
    app.set('trust proxy', 1);
  }
  server.use(
    session({
      secret: "somerandonstuffs",
      resave: false,
      saveUninitialized: true,
      unset: 'destroy',
      name: 'burless_session',
      store: store,
      secure: !isDevMode,
      cookie: {
        maxAge: 300000 * 24 * 60 * 60 * 1000
      }
    })
  );

  server.use('/api', apiRoutes);

  // Server-side
  const route = pathMatch();

  // server.get('/', (req, res) => {
  //   console.log('/ normal')
  //
  //   return app.render(req, res, '/index', req.query);
  // });

  server.get('/artist/:id', (req, res) => {
    console.log('/artist/:id')

    const params = route('/artist/:id')(parse(req.url).pathname);
    return app.render(req, res, '/artist', params);
  });

  server.get('/album/:id', (req, res) => {
    const params = route('/album/:id')(parse(req.url).pathname);
    return app.render(req, res, '/album', params);
  });

  server.get('/:id', (req, res) => {
    linkController.getLink(req, res)
  });

  // server.get('/*', (req, res) => {
  //   const reqUrl = req.url.substring(1);
  //   console.log('reqUrl', reqUrl)
  //   console.log('reqUrl', reqUrl)
  //   console.log('checkUrl(reqUrl)', checkUrl(reqUrl));
  //   res.status(301)
  //   if (checkUrl(reqUrl)) {
  //     linkController.shortenLink(req, res, app, reqUrl)
  //   }
  //   return handle(req, res);
  // });

  server.get('*', async (req, res) => {
    const reqUrl = req.url.substring(1);
    if (checkUrl(reqUrl)) {
      res.status(301);
      await linkController.shortenLink(req, res, app, reqUrl)
    } else {
      return handle(req, res, '/index');
    }
  });

  /* eslint-disable no-console */
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3000');
  });
});