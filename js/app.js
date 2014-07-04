var myApp = angular.module('myApp', [
	'ngRoute',
	'playerControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/index', {
		templateUrl: 'partials/index.html',
		conroller: 'ListController'
	}).
	when('/players', {
		templateUrl: 'partials/players.html',
		controller: 'ListController'
	}).
	otherwise({
		redirectTo: '/players'
	});
}])