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
			var deferred = $q.defer();
			$http.post('/submitAnswer',
				{
					id: questionId,
					option: selectedOption
				}
				).
				success(function(quizData){
					deferred.resolve(quizData);
				});
			return deferred.promise;			
		}

		function resultCallback(deferred,resultData){
			var totalQuestions = resultData.length;
			var totalCorrectAnswers = _.where(resultData,{isCorrect: true}).length;
			var totalPercentage = (totalCorrectAnswers/totalQuestions)*100;
			var resultInfo = {
				mark: totalPercentage,
				data: resultData
			};
			deferred.resolve(resultInfo);
		}

		function getResult(){

			var deferred = $q.defer();
			$http.get('/getResults').
				success(function(data){
					resultCallback(deferred,data);
				});
			return deferred.promise;
		}


		return {
			getQuizData: getQuizData,
			submitAnswer: submitAnswer,
			getResult: getResult
		};

	}]);