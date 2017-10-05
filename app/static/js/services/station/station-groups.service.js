(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('StationGroupsFactory', StationGroupsFactory);
    
    StationGroupsFactory.$inject = ['$resource'];
    
    function StationGroupsFactory($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getGroups: getGroups,
            getGroupMeasurementFrequencies: getGroupMeasurementFrequencies,
            getGroupParameters: getGroupParameters,
            getGroupsParameters: getGroupsParameters,
            getGroupsQCLevels: getGroupsQCLevels,
        };
        
        function getGroups(stationId) {
            var resource = $resource('/api/groups_by_station/:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getGroupsComplete)
                .catch(getGroupsFailed);
                
            function getGroupsComplete(response) {
                return response;
            }
            
            function getGroupsFailed(error) {
                console.log(error);
            }

        }
        
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
        
        function getGroupsParameters(stationId) {
            var resource = $resource('/api/group_parameters_by_station/:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getGroupsParametersComplete)
                .catch(getGroupsParametersFailed);
                
            function getGroupsParametersComplete(response) {
                return response;
            }
            
            function getGroupsParametersFailed(error) {
                console.log(error);
            }

        }
        
        function getGroupMeasurementFrequencies(stationId) {
            var resource = $resource('/api/group_measurement_frequencies_by_station/:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getGroupMeasurementFrequenciesComplete)
                .catch(getGroupMeasurementFrequenciesFailed);
                
            function getGroupMeasurementFrequenciesComplete(response) {
                return response;
            }
            
            function getGroupMeasurementFrequenciesFailed(error) {
                console.log(error);
            }

        }
        
        function getGroupsQCLevels(stationId) {
            var resource = $resource('/api/group_qc_levels_by_station/:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getGroupsQCLevelsComplete)
                .catch(getGroupsQCLevelsFailed);
                
            function getGroupsQCLevelsComplete(response) {
                return response;
            }
            
            function getGroupsQCLevelsFailed(error) {
                console.log(error);
            }

        }
        
    }

})();
