angular.module('quiz.controllers').
	controller('quizController', ['$scope','quizService', 'authService', '$state', '$rootScope',
		function($scope, quizService,authService,$state, $rootScope){
		$scope.quizData = [];
		$scope.name = "test";
		$scope.loggedIn = false;
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
			quizService.submitAnswer(questionId,"A");
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

		$scope.logout = function(event){
			event.preventDefault();
			authService.logout();
		};

		//Utility functions
		function setCurrentQuestion(){
			var currentQuestionInfo = $scope.quizData[$scope.currentQuestionIndex];
			if(currentQuestionInfo){
				$scope.currentQuestion = currentQuestionInfo.question;
				$scope.currentOptions = currentQuestionInfo.options;
				$scope.currentQuestionId = currentQuestionInfo.id;
			}
			
		}

		//listening for events
		$rootScope.$on('logout', function(){
			$scope.loggedIn = false;
			if(!$scope.$$phase) {
				$scope.$digest();
			}
		});
		$rootScope.$on('login', function(){
			$scope.loggedIn = true;
			if(!$scope.$$phase) {
				$scope.$digest();
			}
		});

}]);

