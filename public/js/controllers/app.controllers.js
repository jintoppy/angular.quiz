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
			setCurrentQuestion();
			$state.transitionTo('quiz');
		};

		$scope.submitAnswer = function(questionId, option){
			quizService.submitAnswer(questionId);
			$scope.currentQuestionIndex++;
			setCurrentQuestion();
		};

		//Utility functions
		function setCurrentQuestion(){
			var currentQuestionInfo = $scope.quizData[$scope.currentQuestionIndex];
			$scope.currentQuestion = currentQuestionInfo.question;
			$scope.currentOptions = currentQuestionInfo.options;
			$scope.currentQuestionId = currentQuestionInfo.id;
		}

}]);

