module.exports= (req, res, callback) ->
	
	if req.method is "GET"
		action = req.params.action || "index"
		
		switch action.toString().toLowerCase()
			when "index"
				#get data from user
				callback null, "app/dashboard"
			else
				error = new Error('Action not found: ' + action.toString().toLowerCase())
				error.http_code = 400
				callback(error)

	else if req.method is "POST" 
		if req.params.action? 
			switch req.params.action.toString().toLowerCase()
				when "something"
					#do something
				else 
					error = new Error('Action not found: ' + req.params.action.toString().toLowerCase())
					error.http_code = 400
					callback(error)
		else
			error = new Error('Action is mandatory for POST requests')
			error.http_code = 400
			callback(error)	

	else
		error = new Error('Method is not allowed')
		error.http_code = 405
		callback(error)