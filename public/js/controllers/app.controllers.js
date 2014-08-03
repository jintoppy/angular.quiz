angular.module('quiz.controllers').
	controller('quizController', ['$scope','quizService', 'authService', '$state', '$rootScope',
		function($scope, quizService,authService,$state, $rootScope){

		$scope.startQuiz = startQuiz;
		$scope.submitAnswer = submitAnswer;
		$scope.login = login;
		$scope.logout = logout;
		$scope.showResults = showResults;

		//initialization
		(function initialize(){
			$scope.quizData = [];
			$scope.username="";
			$scope.password = "";
			$scope.loggedIn = false;
			$scope.quizFinished = false;
			quizService.getQuizData().then(function(data){
				$scope.quizData = data;
				$scope.currentQuestionIndex=0;
			});
		})();

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

		//all scope functions
		function login(event, username, password){
			event.preventDefault();
			authService.login(username,password);
		}

		function logout(event){
			event.preventDefault();
			authService.logout();
		}

		function showResults(event){
			event.preventDefault();
			quizService.getResult().then(function(data){
				$scope.results = data;
				$state.transitionTo('result');
			});
		}

		function startQuiz(){
			$scope.currentQuestionIndex=0;
			setCurrentQuestion();
			$state.transitionTo('quiz');
		}

		function submitAnswer(questionId, option){
			quizService.submitAnswer(questionId,"A");
			if($scope.currentQuestionIndex < $scope.quizData.length-1){
				$scope.currentQuestionIndex++;
				setCurrentQuestion();
			}
			else if($scope.currentQuestionIndex === $scope.quizData.length-1){
				$scope.quizFinished = true;
			}
		}

		

		//Utility functions
		function setCurrentQuestion(){
			var currentQuestionInfo = $scope.quizData[$scope.currentQuestionIndex];
			if(currentQuestionInfo){
				$scope.currentQuestion = currentQuestionInfo.question;
				$scope.currentOptions = currentQuestionInfo.options;
				$scope.currentQuestionId = currentQuestionInfo.id;
			}
			
		}

}]);

