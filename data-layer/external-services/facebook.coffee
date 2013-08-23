rest = require 'restler' 

Facebook = rest.service(() ->
  console.log "facebook rest started"
, {
	baseURL: 'https://graph.facebook.com'}, 
	{get: (get_token) ->
		return @.get(get_token)})

exports.get = (get_token, callback) ->
	#client = new Facebook()
	rest.get("https://graph.facebook.com" + get_token, {parser:rest.parsers.json}).on 'complete', (result) ->
		console.log result
		return callback null, result