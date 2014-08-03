var express = require('express'),
	path = require('path'),
	consolidate = require('consolidate'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session');

	var app = express();

	app.use(bodyParser.urlencoded());
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(session({secret: '1234567890QWERTY'}));
	// Set swig as the template engine
	app.engine('server.html', consolidate['swig']);
	app.set('view engine', 'server.html');
	app.set('views', './app/views');
	app.use(express.static(path.resolve('./public')));
	
	require('./app/routes.js')(app);

	app.listen(process.env.PORT || 3800);