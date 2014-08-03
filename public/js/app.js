angular.module('quiz.services',[]);
angular.module('quiz.controllers',[]);
angular.module('quiz.directives',[]);
angular.module('underscore', []).
	factory('_', function(){
		return window._;
	});
	
angular.module('quiz',['ui.router','underscore', 'quiz.controllers',
	'quiz.directives', 'quiz.services']);

angular.module('quiz').
	config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
		$stateProvider
			.state('home', {
				url: "/home",
				templateUrl: "partials/home.html",
				authenticate: true
			})
			.state('quiz', {
				url: "/quiz",
				templateUrl: "partials/quiz.html",
				authenticate: true
			})
			.state('search', {
				url: "/search",
				templateUrl: "partials/search.html",
				authenticate: true
			})
			.state('login', {
				url: "/login",
				templateUrl: "partials/login.html",
				authenticate: false
			});
		$urlRouterProvider.when('', '/home');
		$urlRouterProvider.otherwise('/login');
	}]).
	run(['$rootScope', '$state', 'authService', function($rootScope, $state, authService){
		$rootScope.$on('$stateChangeStart', function(event, toState){
			if(toState.authenticate && !authService.isAuthenticated()){
				$state.transitionTo('login');
				event.preventDefault();
			}
		});
	}]);
