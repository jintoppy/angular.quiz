angular.module('quiz.services').
	factory('authService', ['$http', '$window', '$rootScope', '$state', function($http, $window, $rootScope, $state){
		var isLoggedIn = false;
		function isAuthenticated(){
			return isLoggedIn;
		}

		function successCallback(){
			isLoggedIn = true;
			$state.transitionTo('home');
			$rootScope.$emit('login');
		}

		function login(username, password){
			$http.post('/login', {
				username: username,
				password: password
			}).
			success(successCallback);
		}

		function register(username, password){
			$http.post('/signup', {
				username: username,
				password: password
			}).
			success(successCallback);

		}

		function logout(){
			isLoggedIn = false;
			$http.post('/logout').
				success(function(){
					$rootScope.$emit('logout');
					$state.transitionTo('login');
				});

		}

		return{
			isAuthenticated: isAuthenticated,
			login: login,
			register: register,
			logout: logout
		};
	}]);