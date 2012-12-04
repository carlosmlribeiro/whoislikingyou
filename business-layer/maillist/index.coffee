module.exports= (req, res, callback) ->

	user = require "../../data-layer/collections/user"

	user.insertByEmail req.body.email, (err) ->
		return callback err if err?

		callback null