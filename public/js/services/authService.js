angular.module('quiz.services').
	factory('authService', ['$http', '$window', '$rootScope', '$state', function($http, $window, $rootScope, $state){
		var isLoggedIn = false;
		function isAuthenticated(){
			return isLoggedIn;
		}

		function loginSuccessCallback(){
			isLoggedIn = true;
			$state.transitionTo('home');
		}

		function login(){
			$http.post('/login', {
				username: 'jintoppy@gmail.com',
				password: '1234'
			}).
			success(loginSuccessCallback);
		}

		function register(){

		}

		function logout(){
			isLoggedIn = false;
		}

		return{
			isAuthenticated: isAuthenticated,
			login: login,
			register: register,
			logout: logout
		};
	}]);