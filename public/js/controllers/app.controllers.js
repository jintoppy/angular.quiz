angular.module('quiz.controllers').
	controller('quizController', ['$scope','quizService','$state', function($scope, quizService, $state){
		$scope.quizData = [];
		$scope.name = "test";
		quizService.getQuizData().then(function(data){
			$scope.quizData = data;
			$scope.currentQuestionIndex=0;
		});

		$scope.startQuiz = function(){
			$scope.currentQuestionIndex=0;
			$state.transitionTo('quiz');
		};

}]);

