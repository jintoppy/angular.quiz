angular.module('quiz.controllers').
	controller('quizController', ['$scope','quizService', function($scope, lazyloadService){
		$scope.searchitems = [];
		$scope.getSearchResults = function(){
			lazyloadService.getSearchData().then(function(data){
				var tempArr =$scope.searchitems;
				$scope.searchitems = data.concat(tempArr);
			});
		};

}]);