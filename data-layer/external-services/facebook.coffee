restify = require 'restify' 

exports.get = (url, callback) ->

	client = restify.createJsonClient({url: 'https://graph.facebook.com'})

	client.get url, (err, req, res, obj) =>
		return callback err if err?

		callback null, obj