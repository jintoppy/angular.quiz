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
	var user = _.where(users, {username: username, password: password});
	console.log(user);
	if(user && user.length>0){
		req.session.regenerate(function(){
			req.session.user = username;
			res.status(200).send({
				message: 'success'
			});
		});
	}
	else{
		res.status(403).send({
			message: 'User is not authorized'
		});

	}
};

exports.logout = function(req,res){
	results[req.session.user] = {};
	req.session.destroy();
	res.status(200).send({
		message: 'success'
	});
};

var quizData = require('../app/data/quiz1.json');

exports.getQuizData = function(req, res){
	var quizDataArr = _.toArray(quizData);
	var quizDataArrWithoutAnswer = _.map(quizDataArr, function(data){
		return _.omit(data, 'answer');
	});
	res.json(quizDataArrWithoutAnswer);
};

var results={};

exports.submitAnswer = function(req, res){
	var user = results[req.session.user] = results[req.session.user] || {};
	user[req.body.id] = req.body.option;
	res.status(200).send({
		message: 'success'
	});
};

exports.getResults = function(req, res){
	var resultsArray = [];
	var userResults = results[req.session.user];
	var quizDataArr = _.toArray(quizData);
	_.each(quizDataArr, function(questionInfo){
		var correctAnswerText = _.where(questionInfo.options, {value:questionInfo.answer });
		var userAnswer = userResults[questionInfo.id];
		var userAnswerText = _.where(questionInfo.options, {value:userAnswer});
		var tempData = {
			question: questionInfo.question,
			id: questionInfo.id
		};
		if(userAnswer ==  questionInfo.answer){
			tempData.isCorrect = true;
			tempData.userAnswer =  userAnswerText[0].value + ". " + userAnswerText[0].text;
		}
		else{
			tempData.isCorrect = false;
			tempData.correctAnswer = correctAnswerText[0].value + ". "+ correctAnswerText[0].text;
			tempData.userAnswer =  userAnswerText[0].value + ". " + userAnswerText[0].text;
		}
		resultsArray.push(tempData);

	});

	res.json(resultsArray);

};