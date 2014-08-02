var express = require('express'),
	bodyParser = require('body-parser');

	var app = express();
	app.use(bodyParser.urlencoded());
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');
	app.use(express.static(path.resolve('./public')));
	app.use(bodyParser.json());

	app.listen(config.port);