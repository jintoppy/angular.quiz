angular.module('quiz.services').
	factory('quizService', ['$http','$q', function($http, $q){
		var quizData = [
			{
				"question": "First question",
				"options": ["a","b","c","d"]
			},
			{
				"question": "Second question",
				"options": ["a","b","c","d"]
			}
		];


		function getQuizData(){
			var deferred = $q.defer();
			deferred.resolve(quizData);
			
			return deferred.promise;
		}

		function submitAnswer(inputData){

		}

		function getResult(){

		}

		function getQuestionsWithAnswers(){

		}

		return {
			getQuizData: getQuizData,
			submitAnswer: submitAnswer,
			getResult: getResult,
			getQuestionsWithAnswers: getQuestionsWithAnswers
		};

	}]);