(function() {    
    'use strict';
    
    angular
        .module('app.services')
        .factory('LocationParametersFactory', LocationParametersFactory);
    
    LocationParametersFactory.$inject = ['$resource'];
    
    function LocationParametersFactory($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getParametersAllMeasurementTypes: getParametersAllMeasurementTypes
        };
        
        function getParametersAllMeasurementTypes(locationId) {
            var resource = $resource('/api/parameters_all_measurement_types_by_location/:location_id', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId, 
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({location_id: locationId}).$promise
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
