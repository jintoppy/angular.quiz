angular.module('quiz.controllers').
	controller('quizController', ['$scope','quizService', function($scope, quizService){
		$scope.quizData = [];
		$scope.name = "test";
		quizService.getQuizData().then(function(data){
			$scope.quizData = data;
		});

}]);

