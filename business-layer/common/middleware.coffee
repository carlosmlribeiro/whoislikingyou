exports.type= (type, fn) ->
	(req, res, next) ->
		ct = req.headers['content-type'] || ''
		if (0 isnt ct.indexOf(type))
			return next()
		fn(req,res,next)