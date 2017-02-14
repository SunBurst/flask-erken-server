(function() {
    
    'use strict';

    angular
        .module('app.services')
        .factory('LocationsFactory', LocationsFactory);
    
    LocationsFactory.$inject = ['$resource'];
    
    
    function LocationsFactory($resource) {
        
        var cachedLocationsPromise;
        
        return {
            getLocations: getLocations
        };
        
        function getLocations() {
            var promise = cachedLocationsPromise;
            var resource = $resource('/api/locations/', {}, {
                query: {
                    method: 'GET', params: {},
                    isArray: true,
                    interceptor: {
                        response: function(response) {
                            return response;
                        } 
                    }
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
