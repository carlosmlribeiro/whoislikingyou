cookie_module = require('express/node_modules/cookie')
connect = require('express/node_modules/connect')

module.exports = (app, myAuthentication, io, session_store, events) ->

	io.configure ->
		io.set 'authorization', (data, accept) ->

			if data.headers.cookie
				#Parse cookies into half-formed object
				cookie = cookie_module.parse(data.headers.cookie)
				
				#Verify if valid against secret
				cookie = connect.utils.parseSignedCookies(cookie, 'whoislikingyou')
				cookieID = cookie['sid']

				#Access the session using the cookie's ID and confirm identity
				session_store.get cookieID, (err, session) ->
					if (err || !session)
						accept null, false
					else
						if session.passport.user?
							data.session = session
							data.sessionID = cookieID
							#Invoke callback function and say "true" if user is authenticated
							accept null, true
						else
							accept null, false
			else
				console.log "no cookie"
				accept null, false

	io.sockets.on 'connection', (socket) ->

		socket.on "activatepage", (data) ->
			business_object = require "../dashboard/sockets"

			business_object.activatePage(data)

			

		socket.on 'disconnect', ->
			if socket?.handshake?
				delete socket.handshake.session if socket.handshake?

		if socket.handshake?
			sessionID = socket.handshake.sessionID
			console.log "Connected",sessionID