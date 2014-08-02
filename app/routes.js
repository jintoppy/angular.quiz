module.exports = function(app) {
	// Root routing
	var core = require('../app/controller');
	app.route('/').get(core.index);
};