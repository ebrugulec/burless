const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const MongoDBSession = require('connect-mongodb-session')(session)
const dotenv = require('dotenv')
const redis = require('redis')
const expressip = require('express-ip')
const checkUrl = require('./utils/checkUrl')
const utils = require('./utils')
dotenv.config()

const DB = process.env.DATABASE_URI
const SESSION_SECRET = process.env.SESSION_SECRET
const PORT = process.env.PORT || 8080

mongoose
  .connect(DB, {
    useNestedStrict: true,
    useCreateIndex: true,
  })
  .then((res) => {
    console.log('Mongo Connected')
  });

const store = new MongoDBSession({
  uri: DB,
  collection: 'session',
})

const linkController = require('./server/controllers/linkController')

const dev = process.env.NODE_ENV !== 'production'
const next = require('next')
const pathMatch = require('path-match')
//TODO: check here
const app = next({ dev })
const handle = app.getRequestHandler()
const { parse } = require('url')

const apiRoutes = require('./server/routes/apiRoutes')

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())
  server.use(expressip().getIpInfoMiddleware)
  server.use(cookieParser())

  const corsOptions = {
    origin: '*',
    credentials: true,
  }
  server.use(cors(corsOptions))
  server.use(express.json())

  server.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      unset: 'destroy',
      name: 'burless_session',
      store: store,
      secure: true,
      cookie: {
        maxAge: 300000 * 24 * 60 * 60 * 1000,
      },
    })
  )

  const route = pathMatch()
  server.use('/api', apiRoutes)

  server.get('/login', (req, res) => {
    return app.render(req, res, '/login', req.query)
  });

  server.get('/profile', (req, res) => {
    return app.render(req, res, '/profile')
  });

  server.get('/statistic', (req, res) => {
    return app.render(req, res, '/statistic')
  });

  server.get('/contact', (req, res) => {
    return app.render(req, res, '/contact')
  });

  server.get('/signup', (req, res) => {
    return app.render(req, res, '/signup')
  });

  server.get('/signout', (req, res) => {
    return app.render(req, res, '/signout')
  });

  server.get('/', (req, res) => {
    return app.render(req, res, '/index', req.query)
  });

  server.get('/:id', (req, res) => {
    const paramsId = req.params.id
    if (utils.checkLinkId(paramsId)) {
      return linkController.getLink(req, res, app)
    } else {
      return app.render(req, res, '/link')
    }
  });

  server.get('/*', async (req, res, next) => {
    const reqUrl = req.url.substring(1)
    //TODO: Check here
    if (checkUrl(reqUrl)) {
      res.status(301)
      await linkController.shortenLink(req, res, app, reqUrl)
    } else {
      return handle(req, res, next);
    }
  })

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log('Server ready on PORT', PORT)
  });
})
