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
            getGroupParameters: getGroupParameters,
            getParametersAllMeasurementTypes: getParametersAllMeasurementTypes
        };
        
        function getGroupParameters(stationId, groupId) {
            var resource = $resource('/api/group_parameters_by_station_group/:station_id/:group_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        group_id: groupId
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId, group_id: groupId}).$promise
                .then(getGroupParametersComplete)
                .catch(getGroupParametersFailed);
                
            function getGroupParametersComplete(response) {
                return response;
            }
            
            function getGroupParametersFailed(error) {
                console.log(error);
            }

        }
        
        function getParametersAllMeasurementTypes(stationId) {
            var resource = $resource('/api/parameters_all_measurement_types_by_station/:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId, 
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getParametersAllMeasurementTypesComplete)
                .catch(getParametersAllMeasurementTypesFailed);
                
            function getParametersAllMeasurementTypesComplete(response) {
                return response;
            }
            
            function getParametersAllMeasurementTypesFailed(error) {
                console.log(error);
            }

        }
        
    }

})();
