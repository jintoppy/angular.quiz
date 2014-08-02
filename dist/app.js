angular.module('quiz.services',[]);
angular.module('quiz.controllers',[]);
angular.module('quiz.directives',[]);
angular.module('quiz',['ui.router', 'quiz.controllers',
	'quiz.directives', 'quiz.services']);

angular.module('quiz').
	config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: "partials/home.html"
			})
			.state('search', {
				url: "/search",
				templateUrl: "partials/search.html"
			});
		$urlRouterProvider.when('', '/home');
		$urlRouterProvider.otherwise('/home');
	}]);
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
angular.module('quiz.services').
	factory('quizService', ['$http','$q', function($http, $q){
		var searchPageIndex=1, searchData;

		var getPagedData = function(data, pageIndex){
			//This part should be handled by backend service
			var tempData = data, topIndex;
			topIndex = (tempData.length > (pageIndex * 10)) ? (pageIndex * 10) : tempData.length-1;
			return tempData.slice(topIndex-10, topIndex);
		};

		var getSearchData = function(){
			searchPageIndex = searchPageIndex || 1;
			var deferred = $q.defer();
			if(searchData && searchData.sourceObjectDisplayName){
				if(searchData.sourceObjectDisplayName.length > searchPageIndex * 10 ){
					deferred.resolve(getPagedData(searchData.sourceObjectDisplayName, searchPageIndex));
					searchPageIndex++;
				}
				else{
					deferred.reject();
				}
				
			}
			else{
				$http.get('data/lazyLoadingData.json').
					success(function(data){
						searchData = data;
						deferred.resolve(getPagedData(data.sourceObjectDisplayName, searchPageIndex));
						searchPageIndex++;
					});
			}
			

			return deferred.promise;
		};

		return {
			getSearchData: getSearchData
		};

	}]);