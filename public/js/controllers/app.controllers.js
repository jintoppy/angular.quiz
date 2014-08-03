angular.module('quiz.controllers').
	controller('quizController', ['$scope','quizService', 'authService', '$state',
		function($scope, quizService,authService,$state){
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
			if($scope.currentQuestionIndex < $scope.quizData.length-1){
				$scope.currentQuestionIndex++;
				setCurrentQuestion();
			}
			else if($scope.currentQuestionIndex === $scope.quizData.length-1){
				quizService.finishQuiz();
			}
		};

		$scope.login = function(event){
			event.preventDefault();
			authService.login();
		};

		//Utility functions
		function setCurrentQuestion(){
			var currentQuestionInfo = $scope.quizData[$scope.currentQuestionIndex];
			$scope.currentQuestion = currentQuestionInfo.question;
			$scope.currentOptions = currentQuestionInfo.options;
			$scope.currentQuestionId = currentQuestionInfo.id;
		}

}]);

