module.exports= (req, res, callback) ->

	console.log "entering login"

	user = require "../../data-layer/collections/user"
	facebookAPI = require "../../data-layer/external-services/facebook"

	username = req.session.auth.facebook.user.username
	accessToken = req.session.auth.facebook.accessToken

	get_token = "/" + username + "/accounts&access_token=" + accessToken
				
	facebookAPI.get get_token , (err, obj) ->
		obj = {err:"unable to retreive pages"} if err?

		user.upsert req.session.auth.facebook, obj, (err) ->
			return callback err if err?

			callback null
