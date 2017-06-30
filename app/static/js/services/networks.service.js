(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('networks', networks);
    
    networks.$inject = ['$resource'];
    
    function networks($resource) {
        
        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getNetworks: getNetworks
        };
        
        function getNetworks() {
            var resource = $resource('/api/networks/:bucket', {}, {
                query: {
                    method: 'GET', params: {bucket: 0}, isArray: true, 
                    interceptor: customInterceptor
                }
            });
            
            return resource.query().$promise
                .then(getNetworksComplete)
                .catch(getNetworksFailed);
                
            function getNetworksComplete(response) {
                return response;
            }
            
            function getNetworksFailed(error) {
                console.log(error);
            }
        
        }
        
    }
    
})();
