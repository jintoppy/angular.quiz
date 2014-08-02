var express = require('express'),
	path = require('path'),
	consolidate = require('consolidate'),
	bodyParser = require('body-parser');

	var app = express();

	app.use(bodyParser.urlencoded());
	// Set swig as the template engine
	app.engine('server.html', consolidate['swig']);
	app.set('view engine', 'server.html');
	app.set('views', './app/views');
	app.use(bodyParser.json());
	app.use(express.static(path.resolve('./public')));
	
	var hello = require('./app/routes.js')(app);
	console.log(hello);

	app.listen(process.env.PORT || 3800);