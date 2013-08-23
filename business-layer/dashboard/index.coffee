module.exports= (req, res, events, callback) ->
	
	if req.method is "GET"
		action = req.params.action || "index"
		
		switch action.toString().toLowerCase()
			when "index"
				#get data from user
				objectView = {}
				facebook = require "../../data-layer/external-services/facebook"
				page = require "../../data-layer/collections/page"
				pageId = req.user.activePage._id
				page.getAccess pageId, (err, access_token) ->
					get_token = "/" + pageId + "?access_token=" + access_token
					facebook.get get_token, (err, response) ->
						return callback err if err?
						objectView.pageData = response
						return callback null, "app/dashboard", objectView
			else
				error = new Error('Action not found: ' + action.toString().toLowerCase())
				error.http_code = 400
				callback(error)

	else if req.method is "POST" 
		if req.params.action? 
			switch req.params.action.toString().toLowerCase()
				when "addpages"
					user = require "../../data-layer/collections/user"
					user.addPage req.user.email, req.body, (err, message) -> 
						console.log "sending event"
						events.emit 'changed_active_page',{_id:page.id, name:page.name}
						return callback err, message

				when "getpages"
					reply = []
					facebook = require "../../data-layer/external-services/facebook"
					get_token = "/" + req.user.username + "/accounts?access_token=" + req.user.accessKey
					facebook.get get_token, (err, response) ->
						return callback err if err?
						#save pages in db
						page = require "../../data-layer/collections/page"
						for pageItem in response.data
							page.upsert pageItem, (err) -> 
								return callback err if err?
								#check if page exists in user
								pageItem.exists = true if pageItem.id in req.user.pageTest
								reply.push(pageItem)
						callback null, reply


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