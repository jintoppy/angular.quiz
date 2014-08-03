angular.module('quiz.directives').
	directive('quizItem', [function(){
		function submitAnswer(){
			console.log('clicked submit');
		}
		return {
			restrict: 'EA',
			replace: true,
			scope: {
			},
			link: function(scope, element, attrs){
				scope.submitAnswer = submitAnswer;
				scope.currentQuestion = "what is what?";
				scope.curroptions = [
					{
						text: "A",
						vale: 0
					},
					{
						text: "B",
						vale: 0
					}
				];

			},
			templateUrl: 'partials/directives/quiz-item.html'
		};
	}]);