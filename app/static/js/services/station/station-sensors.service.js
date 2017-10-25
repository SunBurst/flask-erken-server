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
            getSensorGroups: getSensorGroups,
            getSensorParameters: getSensorParameters,
            getSensors: getSensors
        };
        
        function getSensorGroups(sensorId) {
            var resource = $resource('/api/groups_by_sensor/:sensor_id', {}, {
                query: {
                    method: 'GET', params: {
                        sensor_id: sensorId, 
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({sensor_id: sensorId}).$promise
                .then(getSensorGroupsComplete)
                .catch(getSensorGroupsFailed);
                
            function getSensorGroupsComplete(response) {
                return response;
            }
            
            function getSensorGroupsFailed(error) {
                console.log(error);
            }
        }
        
        function getSensorParameters(sensorId) {
            var resource = $resource('/api/parameters_by_sensor/:sensor_id', {}, {
                query: {
                    method: 'GET', params: {
                        sensor_id: sensorId, 
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
