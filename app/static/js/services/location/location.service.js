(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('LocationFactory', LocationFactory);
    
    LocationFactory.$inject = ['$resource'];
    
    function LocationFactory($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getLocation: getLocation,
            getParameters: getParameters,
        };
        
        function getLocation(locationId) {
            var resource = $resource('api/location/:location_id', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId, 
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({location_id: locationId}).$promise
                .then(getLocationComplete)
                .catch(getLocationFailed);
                
            function getLocationComplete(response) {
                return response;
            }
            
            function getLocationFailed(error) {
                console.log(error);
            }
        }
        
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
