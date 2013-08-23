module.exports= (req, res, callback) ->

	user = require "../../data-layer/collections/user"

	user.insertByEmail req.body.email, res.locals.lingua.maillist, (err, message) ->
		callback err, message