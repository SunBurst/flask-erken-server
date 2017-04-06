(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('locationVideos', locationVideos);
    
    locationVideos.$inject = ['$resource'];
    
    function locationVideos($resource) {
        
        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getVideoUrls: getVideoUrls
        };
        
        function getVideoUrls(locationId, onDate) {
            var resource = $resource('/api/video_urls_by_location/:location_id/:on_date', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
                        on_date: onDate
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                    location_id: locationId, 
                    on_date: onDate
                }).$promise
                .then(getVideoUrlsComplete)
                .catch(getVideoUrlsFailed);
                
            function getVideoUrlsComplete(response) {
                return response;
            }
            
            function getVideoUrlsFailed(error) {
                console.log(error);
            }
        }

    }
    
})();
