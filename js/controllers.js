var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
	$http.get('/api/players.php').success(function(data) {
		$scope.players = data;
		$scope.playerOrder = 'name';
	});
}]);

playerControllers.controller('DetailsController', ['$scope', '$http', '$routeParams', '$log', function($scope, $http, $routeParams, $log) {
	$scope.playerId = $routeParams.playerId;
	$log.log('Looking for ' + $scope.playerId);
	$http.get('/api/player.php?term=' + $scope.playerId).success(function(data) {
		$log.log(data);
		$scope.player = data;
	}).error(function(data) {
		$log.log('Failure receiving data from API');
	});

}]);