var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
	$http.get('/api/players.php').success(function(data) {
		$scope.players = data;
		$scope.playerOrder = 'name';
	});
}]);

playerControllers.controller('DetailsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	console.log('Looking for ' + $routeParams.playerId);
	$http.get('/api/players.json').success(function(data) {
		$scope.players = data;
		$scope.whichItem = $routeParams.playerId;
		console.log('Looking for '+$scope.whichItem);
	}).failure(function(data) {
		console.log('Failure');
	});
}]);