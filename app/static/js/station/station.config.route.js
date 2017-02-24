(function() {

    'use strict';
    
    angular
        .module('app.station')
        .config(config);
    
    function config($stateProvider) {
        $stateProvider
            .state('station', {
                url: '/location/:location_id/station/:station_id/',
                templateUrl: 'static/partials/station/station.html',
                controller: 'Location',
                controllerAs: 'vm'
            });
        
    }
        
})();
