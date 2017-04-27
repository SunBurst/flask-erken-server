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
                controller: 'StartCtrl',
                controllerAs: 'startVm',
                resolve: {
                    _stations: function(stations, startStorage) {
                        return stations.getStations()
                            .then(function(response) {
                                var data = response.data
                                var initObjects = true;
                                startStorage.setStationList(data, initObjects);
                                return data;
                            });
                    }
                }
            });

    }
    
})();
