(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('StationSensorsFactory', StationSensorsFactory);
    
    StationSensorsFactory.$inject = ['$resource'];
    
    function StationSensorsFactory($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getSensors: getSensors
        };
        
        function getSensors(stationId) {
            var resource = $resource('/api/sensors_by_station/:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId, 
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getSensorsComplete)
                .catch(getSensorsFailed);
                
            function getSensorsComplete(response) {
                return response;
            }
            
            function getSensorsFailed(error) {
                console.log(error);
            }
        }
        
    }

})();
