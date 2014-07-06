var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
	$http.get('api/players.json').success(function(data) {
		$scope.players = data;
		$scope.playerOrder = 'name';
	});
}]);

playerControllers.controller('DetailsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$http.get('api/players.json').success(function(data) {
		$scope.players = data;
		$scope.whichItem = $routeParams.playerId;
	});
}]);