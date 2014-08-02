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