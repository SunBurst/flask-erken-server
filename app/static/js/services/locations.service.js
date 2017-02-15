(function() {
    
    'use strict';

    angular
        .module('app.services')
        .factory('LocationsFactory', LocationsFactory);
    
    LocationsFactory.$inject = ['$resource'];
    
    function LocationsFactory($resource) {
        
        var cachedLocationsPromise;
        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getLocation: getLocation,
            getLocations: getLocations
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
        
        function getLocations() {
            var promise = cachedLocationsPromise;
            var resource = $resource('/api/locations/', {}, {
                query: {
                    method: 'GET', params: {},
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            if (!promise) {
                promise = resource.query().$promise
                    .then(getLocationsComplete)
                    .catch(getLocationsFailed);
            }
            
            function getLocationsComplete(response) {
                cachedLocationsPromise = promise;
                return response;
            }
            function getLocationsFailed(error) {
                console.log(error);
            }
            
            return promise;

        }
    }

})();
