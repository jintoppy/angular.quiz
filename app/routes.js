module.exports = function(app) {
	// Root routing
	var core = require('../app/controller');
	app.route('/').get(core.index);

	app.route('/login').post(core.login);

	app.route('/getQuizData').get(core.getQuizData);

};