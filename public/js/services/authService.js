angular.module('quiz.services').
	factory('authService', [function(){
		function isAuthenticated(){
			return false;
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