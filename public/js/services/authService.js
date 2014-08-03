angular.module('quiz.services').
	factory('authService', ['$http', '$window', '$rootScope', '$state', function($http, $window, $rootScope, $state){
		var isLoggedIn = false, usernameTemp;
		function isAuthenticated(){
			return isLoggedIn;
		}

		function successCallback(){
			isLoggedIn = true;
			$state.transitionTo('home');
			$rootScope.$emit('login', usernameTemp);
		}

		function login(username, password){
			usernameTemp = username;
			$http.post('/login', {
				username: username,
				password: password
			}).
			success(successCallback);
		}

		function register(username, password){
			usernameTemp = username;
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