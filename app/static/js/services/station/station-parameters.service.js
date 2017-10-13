(function() {    
    'use strict';
    
    angular
        .module('app.services')
        .factory('StationParametersFactory', StationParametersFactory);
    
    StationParametersFactory.$inject = ['$resource'];
    
    function StationParametersFactory($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getParameters: getParameters,
            getParameterMeasurementFrequencies: getParameterMeasurementFrequencies,
            getParameterQCLevels: getParameterQCLevels,
            getParameterSensors: getParameterSensors,
            getProfileParameterVerticalPositions: getProfileParameterVerticalPositions
        };
        
        function getParameterMeasurementFrequencies(stationId) {
            var resource = $resource('/api/parameter_measurement_frequencies_by_station/:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getParameterMeasurementFrequenciesComplete)
                .catch(getParameterMeasurementFrequenciesFailed);
                
            function getParameterMeasurementFrequenciesComplete(response) {
                return response;
            }
            
            function getParameterMeasurementFrequenciesFailed(error) {
                console.log(error);
            }

        }
        
        function getParameterQCLevels(stationId) {
            var resource = $resource('/api/parameter_qc_levels_by_station/:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getParameterQCLevelsComplete)
                .catch(getParameterQCLevelsFailed);
                
            function getParameterQCLevelsComplete(response) {
                return response;
            }
            
            function getParameterQCLevelsFailed(error) {
                console.log(error);
            }

        }
        
        function getParameters(stationId) {
            var resource = $resource('/api/parameters_by_station/:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId, 
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getParametersComplete)
                .catch(getParametersFailed);
                
            function getParametersComplete(response) {
                return response;
            }
            
            function getParametersFailed(error) {
                console.log(error);
            }

        }
        
        function getParameterSensors(stationId) {
            var resource = $resource('/api/parameter_sensors_by_station/:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getParameterSensorsComplete)
                .catch(getParameterSensorsFailed);
                
            function getParameterSensorsComplete(response) {
                return response;
            }
            
            function getParameterSensorsFailed(error) {
                console.log(error);
            }

        }
        
        function getProfileParameterVerticalPositions(stationId, parameterId) {
            var resource = $resource('/api/profile_vertical_positions_by_station_parameter/:station_id/:parameter_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId, parameter_id: parameterId}).$promise
                .then(getProfileParameterVerticalPositionsComplete)
                .catch(getProfileParameterVerticalPositionsFailed);
                
            function getProfileParameterVerticalPositionsComplete(response) {
                return response;
            }
            
            function getProfileParameterVerticalPositionsFailed(error) {
                console.log(error);
            }

        }
        
    }

})();
