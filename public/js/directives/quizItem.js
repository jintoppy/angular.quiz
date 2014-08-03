angular.module('quiz.directives').
	directive('quizItem', [function(){
		return {
			restrict: 'EA',
			replace: true,
			scope: {
				question: '=',
				id: '=',
				options: '=',
				submit: '&onAnswer'

			},
			link: function(scope, element, attrs){
				console.log(scope.question);
				console.log(scope.options);
				scope.submitAnswer = function(event){
					event.preventDefault();
					scope.submit({id:scope.id});
				};
			},
			templateUrl: 'partials/directives/quiz-item.html'
		};
	}]);