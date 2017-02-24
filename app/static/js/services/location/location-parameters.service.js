(function() {
    
    'use strict';
    
    angular
        .module('app.services')
        .factory('locationParameters', locationParameters);
    
    locationParameters.$inject = ['$resource'];
    
    function locationParameters($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getParameters: getParameters
        };
        
        function getParameters(locationId) {
            var resource = $resource('/api/parameters_by_location/:location_id', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId, 
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({location_id: locationId}).$promise
                .then(getParametersComplete)
                .catch(getParametersFailed);
                
            function getParametersComplete(response) {
                return response;
            }
            
            function getParametersFailed(error) {
                console.log(error);
            }

        }
        
    }

})();
