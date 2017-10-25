(function() {    
    'use strict';
    
    angular
        .module('app.services')
        .factory('SensorsFactory', SensorsFactory);
    
    SensorsFactory.$inject = ['$resource'];
    
    function SensorsFactory($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getSensorParameters: getSensorParameters,
        };
        
        function getSensorParameters(sensorId) {
            var resource = $resource('/api/parameters_by_sensor/:sensor_id', {}, {
                query: {
                    method: 'GET', params: {
                        sensor_id: sensorId
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({sensor_id: sensorId}).$promise
                .then(getSensorParametersComplete)
                .catch(getSensorParametersFailed);
                
            function getSensorParametersComplete(response) {
                return response;
            }
            
            function getSensorParametersFailed(error) {
                console.log(error);
            }
        }
        
    }
    
})();
