// Generated by CoffeeScript 1.4.0
var app, express, http, lingua, mongodb, myAuthentication, myErrorHandler, myMiddleware, myRoutes, mySocketRoutes, server, session_store, socket_io, winston;

express = require("express");

http = require("http");

winston = require("winston");

socket_io = require("socket.io");

lingua = require("lingua");

mongodb = require("connect-mongodb");

myMiddleware = require("./business-layer/common/middleware");

myErrorHandler = require("./business-layer/common/errorHandler");

myAuthentication = require("./business-layer/common/authentication");

myRoutes = require("./business-layer/common/routes");

mySocketRoutes = require("./business-layer/common/socketroutes");

app = module.exports = express();

app.set('views', "./user-interface/views");

app.set('view engine', 'toffee');

app.set('db', "mongodb://admin:whoislikingyou@alex.mongohq.com:10072/whoislikingyou");

app.set('port', process.env.npm_package_config_port);

app.locals.layout = './user-interface/views/layout.toffee';

if (app.get("env") === "development") {
  app.use(express.logger('dev'));
}

app.use(express.favicon('./public/images/favicon.ico'));

app.use(myMiddleware.type('multipart/form-data', express.limit('20mb')));

app.use(lingua(app, {
  defaultLocale: 'en',
  path: './user-interface/locales'
}));

app.use(express.bodyParser({
  keepExtensions: true,
  uploadDir: "./public/uploads"
}));

session_store = new mongodb({
  url: "mongodb://admin:whoislikingyou@alex.mongohq.com:10072/whoislikingyou"
});

app.use(express.cookieParser('whoislikingyou'));

app.use(express.session({
  key: 'sid',
  cookie: {
    maxAge: 3600000
  },
  store: session_store
}));

app.use(express.compress({
  level: 9,
  memLevel: 9
}));

app.use(express["static"]('./public'));

app.use(app.router);

if (app.get("env") === "development") {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.disable('view cache');
} else {
  app.use(myErrorHandler.logErrors);
  app.use(myErrorHandler.clientErrorHandler);
  app.use(myErrorHandler.errorHandler);
}

myRoutes(app);

server = http.createServer(app);

server.listen(app.get('port'), function() {
  return console.log("Express server listening on port " + server.address().port + ", in " + app.get("env"));
});
