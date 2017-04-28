(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('stationVideos', stationVideos);
    
    stationVideos.$inject = ['$resource'];
    
    function stationVideos($resource) {
        
        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getVideoUrls: getVideoUrls
        };
        
        function getVideoUrls(stationId, onDate) {
            var resource = $resource('/api/video_urls_by_station/:station_id/:on_date', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        on_date: onDate
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                    station_id: stationId, 
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
