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