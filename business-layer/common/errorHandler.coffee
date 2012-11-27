exports.logErrors = (err, req, res, next) ->
	console.error err.stack 
	next(err)

exports.clientErrorHandler= (err, req, res, next) ->
	if req.xhr
		res.send(500, { error: 'XHR error' })
	else
		next(err)

exports.errorHandler = (err, req, res, next) ->
	res.status err.http_code || 500
	res.render("error", {layout: './user-interface/views/error/layout.toffee'})