var playerControllers = angular.module('playerControllers', []);

playerControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
    // initialize faceted search object
    $scope.search = {
        "PlayerName" : "",
        "Position" : {},
        "Citizenship" : {}
    };
    $scope.filter = {};
	$http.get('/api/players.php').success(function(data) {
		$scope.players = data;
		$scope.playerOrder = 'name';
        // need to summarize data to populate facet objects
        $scope.filter.positions = [
            "foo",
            "bar"
        ];
        $scope.filter.countries = [
            "search.Citizenship.Afghanistan",
            "search.Citizenship.Albania",
            "search.Citizenship.Bermuda",
        ];
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
        if (list != undefined) {
            return list.filter( function( item ) {

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

                if ( searchobj.PlayerName != "" && item.PlayerName.indexOf(searchobj.PlayerName) === -1 ) {
                    return false;
                }

                for ( Position in searchobj.Position ) {
                    any_value_set = any_value_set || searchobj.Position[Position];
                    passes_filters = passes_filters || (searchobj.Position[ Position ] && item.Position == Position);
                }
                if( any_value_set && !passes_filters ) {
                    return false;
                }

                any_value_set = false;
                passes_filters = false;
                for ( Citizenship in searchobj.Citizenship ) {
                    any_value_set = any_value_set || searchobj.Citizenship[ Citizenship ];
                    passes_filters = passes_filters || (searchobj.Citizenship[ Citizenship ] && item.Citizenship.replace(/\s/g,'') == Citizenship);
                }
                if( any_value_set && !passes_filters ) {
                    return false;
                }
                return true;
            } );
        }
    };
});

/* ############################################################################
####
#### Games Controller
*/

var gameControllers = angular.module('gameControllers', []);

gameControllers.controller('GameListController', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/games.php').success(function(data) {
        $scope.games = data;
    });
}]);
