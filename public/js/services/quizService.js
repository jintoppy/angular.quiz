angular.module('quiz.services').
	factory('quizService', ['$http','$q', '_', function($http, $q, _){

		function getQuizData(){
			var deferred = $q.defer();
			$http.get('/getQuizData').
				success(function(quizData){
					deferred.resolve(quizData);
				});
			return deferred.promise;
		}

		function submitAnswer(questionId, selectedOption){
			$http.post('/submitAnswer', 
				{
					id: questionId,
					option: selectedOption
				}
				).
				success(function(quizData){
					deferred.resolve(quizData);
				});
		}

		function getResult(){

			var deferred = $q.defer();
			$http.get('/getResults').
				success(function(resultData){
					deferred.resolve(resultData);
				});
			return deferred.promise;

		}


		return {
			getQuizData: getQuizData,
			submitAnswer: submitAnswer,
			getResult: getResult
		};

	}]);