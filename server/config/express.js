var path = require("path");
var bodyParser = require("body-parser");
var url = require("url");
var cors = require("cors");

var cookieParser = require("cookie-parser");
var express = require("express");
var passport = require("passport");
var session = require("express-session");

var exceptions = require("../config/exceptions");

module.exports = function () {
  var logger = function (req, res, next) {
    console.log("logger: ", req.method, req.url);
    next();
  };

  var app = express();

  app.use(cors()); // cross plattform origin

  // Log requests
  app.use(logger);

  // Deliver static packages
  app.use(express.static("server/public"));

  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");

    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
  });

  // Session handling
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(
    session({
      secret: "chooseGoodSecret",
      resave: "true",
      saveUninitialized: "true",
      cookie: { maxAge: 60 * 60 * 24 * 365 * 1000 },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // User login and management
  var userMiddleware = require("../app/routes/user.server.routes.js");
  userMiddleware(app);

  // REST Api calls
  var articlesMiddleware = require("../app/routes/article.server.routes");
  articlesMiddleware(app);

  // Error handling
  app.use(function (err, req, res, next) {
    if (err instanceof exceptions.InputException)
      res.status(400).send(`${err.name}: ${err.message}`);
    else {
      res.status(500).send();
      console.log(err.stack);
    }

    next();
  });

  return app;
};
