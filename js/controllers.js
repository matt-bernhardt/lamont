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

myApp.filter('playerFilter', function() {
	console.log('Filter');
    return function( list, searchobj ) {
    	console.log('asdf');
        return list.filter( function( item ) {
            var passes_filters = false,
                any_filter_set = false;

            for ( Position in searchobj ) {
                any_filter_set = any_filter_set || searchobj[ Position ];
                passes_filters = passes_filters || (searchobj[ Position ] && item.Position == Position);
            }
            return !any_filter_set || passes_filters;
        } );
    };
});