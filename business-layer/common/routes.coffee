module.exports = (app, myAuthentication) ->

	#homepage (public)
	app.get '/', (req, res) ->
		res.render('public/index', {layout:null})

	#each customer public page (public)
	app.get '/:customer/:id', (req, res, next) ->
		#t0d0
		next()

	app.post '/maillist', (req, res) ->
		maillist = require("../maillist")
		maillist req, res, (err) ->
			return res.send(500, {error:err}) if err
			res.send(200)


	#process login (private)
	app.get '/app/login', myAuthentication.isAuth, (req, res, next) ->
		#refresh or create user in db 
		login = require("../login")

		login req, res, (err) ->
			return next(err) if err?
			res.redirect("/app/dashboard")
		

	#all app pages (private)
	app.all '/app/:page', myAuthentication.isAuth, (req, res, next) ->
		business_object_path = "../"+req.params.page.toString().toLowerCase()
		try
			business_object = require(business_object_path)
		catch er
			return next()

		business_object req, res, (err, view, objectView) ->
			return next(err) if err?
			objectView = {} if not objectView?
			objectView.user = req.session.auth.facebook.user
			objectView.url = req.url
			res.render(view,objectView)

	app.get '*', myAuthentication.auth, (req, res, next) ->
		#render template 404
		res.status 404
		res.render("public/404", {layout:"user-interface/views/public-layout.toffee", title:"Not found"})

	#404 page
	app.get '*', (req, res) ->
		res.redirect("/")
		