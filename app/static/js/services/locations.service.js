(function() {
    
    'use strict';
    
    angular
        .module('app.services')
        .factory('locations', locations);
    
    locations.$inject = ['$resource'];
    
    function locations($resource) {
        
        var cachedLocationsPromise;
        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getLocations: getLocations,
        };
        
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
