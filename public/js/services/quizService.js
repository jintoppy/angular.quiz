angular.module('quiz.services').
	factory('quizService', ['$http','$q', function($http, $q){
		var quizData = [
			{
				"id": 0,
				"question": "First question",
				"options": [
					{
						"text": "A",
						"value": "A"
					},
					{
						"text": "B",
						"value": "B"
					},
					{
						"text": "C",
						"value": "C"
					}
				]
			},
			{
				"id": 1,
				"question": "Second question",
				"options": [
					{
						"text": "A",
						"value": "A"
					},
					{
						"text": "B",
						"value": "B"
					},
					{
						"text": "C",
						"value": "C"
					}
				]
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