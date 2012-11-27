#require external libraries
express = require "express"
http = require "http"
winston = require "winston"
#socket_io = require "socket.io"
lingua = require "lingua"
mongodb = require "connect-mongodb"

#require internal libraries
myMiddleware = require "./business-layer/common/middleware"
myErrorHandler = require "./business-layer/common/errorHandler"
myAuthentication = require "./business-layer/common/authentication"
myRoutes = require "./business-layer/common/routes"
mySocketRoutes = require "./business-layer/common/socketroutes"

#add custom event register
#t0d0 - winston on mongodb

#configure application
app = module.exports = express()

app.set 'views', "./user-interface/views"
app.set 'view engine', 'toffee'
app.set 'db', "mongodb://admin:whoislikingyou@alex.mongohq.com:10072/whoislikingyou"
app.set 'port', process.env.PORT || 5000

app.locals.layout = './user-interface/views/layout.toffee'

if app.get("env") is "development"
	app.use express.logger('dev')

app.use express.favicon('./public/images/favicon.ico')
app.use myMiddleware.type('multipart/form-data', express.limit('20mb'))

app.use lingua app, {defaultLocale: 'en', path: './user-interface/locales'}
app.use express.bodyParser({keepExtensions: true, uploadDir: "./public/uploads"})

#session support
session_store = new mongodb({url:"mongodb://admin:whoislikingyou@alex.mongohq.com:10072/whoislikingyou"})
app.use express.cookieParser('whoislikingyou') 
app.use express.session({key: 'sid', cookie: {maxAge: 3600000}, store: session_store })

app.use express.compress({level:9, memLevel:9})
app.use express.static('./public')

app.use app.router

if app.get("env") is "development"
	app.use express.errorHandler({dumpExceptions:true, showStack:true})
	app.disable('view cache')
else
	app.use myErrorHandler.logErrors
	app.use myErrorHandler.clientErrorHandler
	app.use myErrorHandler.errorHandler

myRoutes app

server = http.createServer(app)

#io = socket_io.listen(server)

#if app.get("env") is "development"
#	io.set("log level", 3)
#else
#	io.set("log level", false)

#mySocketRoutes()

server.listen app.get('port'), ->
	console.log "Express server listening on port " + server.address().port + ", in " +  app.get("env")
