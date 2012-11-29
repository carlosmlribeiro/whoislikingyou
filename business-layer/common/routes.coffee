module.exports = (app) ->

	app.get '/', (req, res) ->
		res.render('public/index', {layout:"user-interface/views/index-layout.toffee", title:"Who Is Liking You?"})