#is autenticated
exports.isAuth = (req, res, next) ->
	if req.session.auth?
		next()
	else
		res.redirect('/')