var _ = require('underscore');
exports.index = function(req, res) {
	res.render('index', {
		user: (req.session && req.session.user) || undefined
	});
};


var users=[
{
	username: 'jintoppy@gmail.com',
	password: '1234'
}];

exports.signup = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var user = _.where(users, {username: username});
	if(user){
		res.status(403).send({
			message: 'username taken'
		});
	}
	else{
		req.session.regenerate(function(){
			req.session.user = username;
			users.push({
				username: username,
				password: password
			});
			res.status(200).send({
				message: 'success'
			});
		});
		
	}

};


exports.login = function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	var user = _.where(users, {username: username});
	if(user){
		req.session.regenerate(function(){
			req.session.user = username;
			console.log('login success');
			res.status(200).send({
				message: 'success'
			});
		});
	}
	else{
		console.log('some error');
		res.status(403).send({
			message: 'User is not authorized'
		});

	}
};

exports.logout = function(req,res){
	req.session.destroy();
};

var quizData = require('../app/data/quiz1.json');
exports.getQuizData = function(req, res){
	var quizWithoutAnswers = _.omit(quizData, 'answer');
	res.json(quizWithoutAnswers);
};
