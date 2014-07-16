var myApp = angular.module('myApp', [
	'ngRoute',
	'playerControllers',
	'gameControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/index', {
		templateUrl: 'partials/index.html',
		conroller: 'ListController'
	}).
	when('/game/:gameId', {
		templateUrl: 'partials/game.html',
		controller: 'GameDetailController'
	}).
	when('/games', {
		templateUrl: 'partials/games.html',
		controller: 'GameListController'
	}).
	when('/player/:playerId', {
		templateUrl: 'partials/player.html',
		controller: 'DetailsController'
	}).
	when('/players', {
		templateUrl: 'partials/players.html',
		controller: 'ListController'
	}).
	when('/teams', {
		templateUrl: 'partials/teams.html',
		controller: 'ListController'
	}).
	otherwise({
		redirectTo: '/index'
	});
}]);