(function() {
    
    'use strict';
    
    angular
        .module('app.start')
        .config(config);
    
    function config($stateProvider) {
        
        $stateProvider
            .state('start', {
                url: '/start',
                templateUrl: 'static/partials/start/start.html',
                controller: 'Start',
                controllerAs: 'vm',
                resolve: {
                    resolvedLocations: function(locations, startStorage) {
                        return locations.getLocations()
                            .then(function(response) {
                                var data = response.data
                                var initObjects = true;
                                startStorage.setLocationList(data, initObjects);
                                return data;
                            });
                    }
                }
            });

    }
    
})();
