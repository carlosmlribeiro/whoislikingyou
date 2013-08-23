mongoose = require('mongoose')

mongodb_username = process.env.mongodb_username || "admin"
mongodb_password = process.env.mongodb_password || "whoislikingyou"
mongodb_port = process.env.mongodb_port || 10072
mongodb_host = process.env.mongodb_host || "alex.mongohq.com"
mongodb_database = process.env.mongodb_database || "whoislikingyou"
mongodbURL = "mongodb://"+ mongodb_username + ":" + mongodb_password + "@" + mongodb_host + ":" + mongodb_port + "/" + mongodb_database

db = mongoose.createConnection(mongodbURL)

schema = mongoose.Schema({
	facebookId: Number,
	username: String,
	name: String,
	email: String,
	pages: [{
		_id: String,
		name: String}],
	activePage: {
		_id: String,
		name: String},
	pageTest:Array,
	accessKey: String,
	locale: String,
	gender: String,
	timezone: String,
	updated_time: { type: Date, default: Date.now },
	location: {
		_id: String, 
		name: String}});

@User = db.model('User', schema)

exports.upsert = (accessToken, profile, callback) ->
	first_login = false

	@User.findOne { 'email': profile.emails[0].value }, (err, user) =>
		return callback err if err?
		if not user
			user = new @User({ email: profile.emails[0].value })
			first_login = true
		
		user.username = profile.username
		user.name = profile.displayName
		user.accessKey = accessToken
	
		user.save (err, user) ->
			console.log err if err?
			return callback(err, user, first_login)

exports.insertByEmail = (email, messages, callback) ->
	
	userdb = new @User({ email: email })

	userdb.save (err) ->
		if err?
			if err.code == 11000
				message = messages.exists 
			else
				message = messages.error
		else
			message = messages.success

		callback err, message

exports.addPage = (userEmail, page, callback) ->
	
	@User.findOne { email: userEmail }, (err, userdb) ->
		return callback err if err?

		return callback "no user found" if not userdb
	
		userdb.pageTest.push(page.id)
		userdb.pages.push({_id:page.id, name:page.name})
		userdb.activePage = {_id: page.id, name: page.name}

		userdb.save (err) ->
			return callback err

exports.activatePage = (userEmail, page, callback) ->
	@User.findOne { email: userEmail }, (err, userdb) ->
		return callback err if err?
		return callback "no user found" if not userdb
	
		userdb.activePage = {_id: page.id, name: page.name}

		userdb.save (err) ->
			return callback err
