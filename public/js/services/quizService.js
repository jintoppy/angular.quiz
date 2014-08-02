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


		var getQuizData = function(){
			var deferred = $q.defer();
			deferred.resolve(quizData);
			
			return deferred.promise;
		};

		return {
			getQuizData: getQuizData
		};

	}]);