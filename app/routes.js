module.exports = function(app) {
	// Root routing
	var core = require('../app/controller');
	app.route('/').get(core.index);

	app.route('/login').post(core.login);
	app.route('/signup').post(core.signup);

	app.route('/logout').post(core.logout);

	app.route('/getQuizData').get(core.getQuizData);

	app.route('/submitAnswer').post(core.submitAnswer);

	app.route('/getResults').get(core.getResults);

};