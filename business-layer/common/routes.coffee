module.exports = (app, myAuthentication, events) ->

	#homepage (private)
	app.get '/', (req, res) ->
		res.redirect('/home')
		
	#all app pages (private)
	app.all '/app/:page/:action?', myAuthentication.ensureAuthenticated, (req, res, next) ->
		business_object_path = "../"+req.params.page.toString().toLowerCase()
		try
			business_object = require(business_object_path)
		catch er
			return next()

		console.log req.xhr
		
		if req.xhr
			business_object req, res, events, (err, message) ->
				return next(err) if err?
				return res.send(200, {message:message})
		else
			business_object req, res, events, (err, view, objectView) ->
				return next(err) if err?
				objectView = {} if not objectView?
				objectView.user = req.user
				objectView.url = req.url
				return res.render(view,objectView)

	#homepage (public)
	app.get '/home', (req, res) ->
		res.render('public/index', {layout:null})

	#each customer public page (public)
	app.get '/:customer/:id', (req, res, next) ->
		#t0d0
		next()

	#register email address (public)
	app.post '/maillist', (req, res, next) ->
		maillist = require("../maillist")
		maillist req, res, (err, message) ->
			return next(err) if err?
			res.send(200, {message:message})

	#facebook authentication
	app.get '/auth/facebook', myAuthentication.passport.authenticate 'facebook', { scope: ['email', 'manage_pages', 'read_insights'], failureRedirect: '/home' }

	app.get '/auth/facebook/callback', 
		myAuthentication.passport.authenticate 'facebook', 
			{ successRedirect: '/app/dashboard',
			failureRedirect: '/home'}

	app.get '/logout', (req, res) ->
  		req.logout()
  		res.redirect('/home')

	#404 page
	app.get '*', myAuthentication.ensureAuthenticated, (req, res, next) ->
		res.status 404 
		res.render "/404"

	app.get '*', (req, res) ->
		res.redirect("/home")
		