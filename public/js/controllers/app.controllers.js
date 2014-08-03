angular.module('quiz.controllers').
	controller('quizController', ['$scope','quizService', 'authService', '$state', '$rootScope',
		function($scope, quizService,authService,$state, $rootScope){

		var quizDataPromise;

		//scope methods
		$scope.startQuiz = startQuiz;
		$scope.submitAnswer = submitAnswer;
		$scope.login = login;
		$scope.logout = logout;
		$scope.register = register;
		$scope.showResults = showResults;


		//initialization
		(function initialize(){
			$scope.quizData = [];
			$scope.loggedIn = false;
			$scope.quizFinished = false;
			quizDataPromise = quizService.getQuizData();
			quizDataPromise.then(function(data){
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
		$rootScope.$on('login', function(event,user){
			$scope.loggedIn = true;
			$scope.username = user;
		});

		//all scope functions
		function login(event, username, password){
			event.preventDefault();
			$scope.username = username;
			authService.login(username,password);
		}

		function register(event, username, password){
			event.preventDefault();
			$scope.username = username;
			authService.register(username,password);
		}

		function logout(event){
			event.preventDefault();
			authService.logout();
		}

		function showResults(event){
			event.preventDefault();
			quizService.getResult().then(function(result){
				$scope.results = result.data;
				$scope.mark = result.mark;
				$state.transitionTo('result');
			});
		}

		function startQuiz(){
			quizDataPromise.then(function(){
				$scope.currentQuestionIndex=0;
				setCurrentQuestion();
				$state.transitionTo('quiz');
			});
			
		}

		function submitAnswer(questionId, option){
			quizService.submitAnswer(questionId,option);
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

