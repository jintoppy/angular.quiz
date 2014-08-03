angular.module('quiz.services').
	factory('authService', [function(){
		function isAuthenticated(){
			return true;
		}

		function login(){

		}

		function register(){

		}

		return{
			isAuthenticated: isAuthenticated,
			login: login,
			register: register
		};
	}]);