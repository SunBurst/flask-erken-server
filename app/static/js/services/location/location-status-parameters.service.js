(function() {
    
    'use strict';
    
    angular
        .module('app.services')
        .factory('locationStatusParameters', locationStatusParameters);
    
    locationStatusParameters.$inject = ['$resource'];
    
    function locationStatusParameters($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getStatusParameters: getStatusParameters
        };
        
        function getStatusParameters(locationId) {
            var resource = $resource('/api/status_parameters_by_location/:location_id', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId, 
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({location_id: locationId}).$promise
                .then(getStatusParametersComplete)
                .catch(getStatusParametersFailed);
                
            function getStatusParametersComplete(response) {
                return response;
            }
            
            function getStatusParametersFailed(error) {
                console.log(error);
            }

        }
        
    }

})();
