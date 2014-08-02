angular.module('quiz.services').
	factory('authService', [function(){
		function isAuthenticated(){
			return false;
		}

		return{
			isAuthenticated: isAuthenticated
		};
	}]);