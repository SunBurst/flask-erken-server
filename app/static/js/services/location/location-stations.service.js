(function() {
    
    'use strict';
    
    angular
        .module('app.services')
        .factory('locationStations', locationStations);
    
    locationStations.$inject = ['$resource'];
    
    function locationStations($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getStations: getStations
        };
        
        function getStations(locationId) {
            var resource = $resource('/api/stations_by_location/:location_id', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId, 
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({location_id: locationId}).$promise
                .then(getStationsComplete)
                .catch(getStationsFailed);
                
            function getStationsComplete(response) {
                return response;
            }
            
            function getStationsFailed(error) {
                console.log(error);
            }
        }
        
    }

})();
