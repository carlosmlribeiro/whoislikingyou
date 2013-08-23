exports.boot = () ->

	UserClass = require "../../data-layer/collections/user"

	appId = process.env.appId || '111565172259433' #defaults to everyauth id
	appSecret = process.env.appSecret || '85f7e0a0cc804886180b887c1f04a3c1' #defaults to everyauth secret

	@passport.serializeUser (user, callback) ->
		callback(null, user.id)

	@passport.deserializeUser (id, callback) ->
		UserClass.User.findOne { _id: id }, (err, user) ->
			callback(err, user)

	# use facebook strategy
	fS = @facebookStrategy.Strategy
	@passport.use new fS({
		clientID: appId,
		clientSecret: appSecret,
		callbackURL: "/auth/facebook/callback"},
		(accessToken, refreshToken, profile, callback) -> 
			UserClass.upsert accessToken, profile, (err, user) ->
				callback err, user)

exports.ensureAuthenticated = (req, res, next) ->
	return next() if req.isAuthenticated()
	res.redirect('/home')