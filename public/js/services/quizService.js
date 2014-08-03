angular.module('quiz.services').
	factory('quizService', ['$http','$q', '_', function($http, $q, _){

		function getQuizData(){
			var deferred = $q.defer();
			$http.get('/getQuizData').
				success(function(quizData){
					deferred.resolve(_.toArray(quizData));
				});
			return deferred.promise;
		}

		function submitAnswer(inputData){

		}

		function getResult(){

		}

		function getQuestionsWithAnswers(){

		}

		function finishQuiz(){

		}

		return {
			getQuizData: getQuizData,
			submitAnswer: submitAnswer,
			getResult: getResult,
			getQuestionsWithAnswers: getQuestionsWithAnswers,
			finishQuiz: finishQuiz
		};

	}]);