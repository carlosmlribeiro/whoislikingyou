mongoose = require('mongoose')

mongodb_username = process.env.mongodb_username || "admin"
mongodb_password = process.env.mongodb_password || "whoislikingyou"
mongodb_port = process.env.mongodb_port || 10072
mongodb_host = process.env.mongodb_host || "alex.mongohq.com"
mongodb_database = process.env.mongodb_database || "whoislikingyou"
mongodbURL = "mongodb://"+ mongodb_username + ":" + mongodb_password + "@" + mongodb_host + ":" + mongodb_port + "/" + mongodb_database

db = mongoose.createConnection(mongodbURL)

schema = mongoose.Schema({
	username: 'string',
	email: 'string'});

exports.upsert = (user, data, callback) ->

	#insert or update user in mongodb
	callback null

exports.insertByEmail = (email, callback) ->

	User = db.model('User', schema);
	
	userdb = new User({ username: '', email: email });

	userdb.save (err) ->
		return callback err if err?

		callback null