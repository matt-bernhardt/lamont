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
    return function( list, searchobj ) {
        return list.filter( function( item ) {
            var passes_filters = false,
                any_filter_set = false;

            for ( Position in searchobj.Position ) {
                any_filter_set = any_filter_set || searchobj.Position[ Position ];
                passes_filters = passes_filters || (searchobj.Position[ Position ] && item.Position == Position);
            }

            for ( Citizenship in searchobj.Citizenship ) {
                any_filter_set = any_filter_set || searchobj.Citizenship[ Citizenship ];
                passes_filters = passes_filters || (searchobj.Citizenship[ Citizenship ] && item.Citizenship == Citizenship);
            }

            return !any_filter_set || passes_filters;
        } );
    };
});