(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('locations', locations);
    
    locations.$inject = ['$resource'];
    
    function locations($resource) {
        
        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getLocationsAndStations: getLocationsAndStations
        };
        
        function getLocationsAndStations() {
            var resource = $resource('/api/locations_and_stations/:bucket', {}, {
                query: {
                    method: 'GET', params: {bucket: 0}, isArray: true, 
                    interceptor: customInterceptor
                }
            });
            
            return resource.query().$promise
                .then(getLocationsComplete)
                .catch(getLocationsFailed);
                
            function getLocationsComplete(response) {
                return response;
            }
            
            function getLocationsFailed(error) {
                console.log(error);
            }
        
        }
        
    }

})();
