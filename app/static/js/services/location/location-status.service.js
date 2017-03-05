(function() {
    
    'use strict';
    
    angular
        .module('app.services')
        .factory('locationStatus', locationStatus);
    
    locationStatus.$inject = ['$resource'];
    
    function locationStatus($resource) {
        
        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getSensorsStatus: getSensorsStatus
        };
        
        function getSensorsStatus(locationId) {
            var resource = $resource('/api/sensor_status_by_location/:location_id', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId, 
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({location_id: locationId}).$promise
                .then(getSensorsStatusComplete)
                .catch(getSensorsStatusFailed);
                
            function getSensorsStatusComplete(response) {
                return response;
            }
            
            function getSensorsStatusFailed(error) {
                console.log(error);
            }
        }
    }
    
})();
