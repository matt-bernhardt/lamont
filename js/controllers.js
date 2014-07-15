var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
    $scope.search = {
        "PlayerName" : "",
        "Position" : {},
        "Citizenship" : {}
    };
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
    	console.log("Filtering...");
        console.log(searchobj);
        console.log("Length: " + searchobj.size);
        return list.filter( function( item ) {

            console.log('-----------');
        	console.log(item.PlayerName + ' - ' + item.Position + ' - ' + item.Citizenship);

            // Check for filters set
            var any_filter_set = false;
            if ( searchobj.hasOwnProperty('PlayerName') && searchobj.PlayerName != "" ) {
                any_filter_set = true;
            }
            for ( Position in searchobj.Position) {
                any_filter_set = any_filter_set || searchobj.Position[ Position ];
            }
            for ( Citizenship in searchobj.Citizenship) {
                any_filter_set = any_filter_set || searchobj.Citizenship[ Citizenship ];
            }
            // If any_filter_set is still false, just pass everything through
            if ( !any_filter_set ) { return !any_filter_set; }

            // Still here? Do the filters pass?
            var any_value_set = false;
            var passes_filters = false;

            console.log('Player Name: ' + searchobj.PlayerName);
            if ( searchobj.PlayerName != "" && item.PlayerName.indexOf(searchobj.PlayerName) === -1 ) {
                console.log('  Failed name filter');
                return false;
            }

            console.log('Position:');
            console.log(searchobj.Position);
            for ( Position in searchobj.Position ) {
                any_value_set = any_value_set || searchobj.Position[Position];
                passes_filters = passes_filters || (searchobj.Position[ Position ] && item.Position == Position);
            }
            if( any_value_set && !passes_filters ) {
                console.log('  Failed position filter');
                return false;
            }

            console.log('Citizenship:');
            console.log(searchobj.Citizenship);
            any_value_set = false;
            passes_filters = false;
            for ( Citizenship in searchobj.Citizenship ) {
                console.log(item);
                any_value_set = any_value_set || searchobj.Citizenship[ Citizenship ];
                passes_filters = passes_filters || (searchobj.Citizenship[ Citizenship ] && item.Citizenship.replace(/\s/g,'') == Citizenship);
            }
            if( any_value_set && !passes_filters ) {
                console.log('  Failed citizenship filter');
                return false;
            }
            console.log('Passes filters: ' + passes_filters);
            return true;
        } );
    };
});