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
            getVideoUrls: getVideoUrls,
            getVideoUrlsAscendingByLimit: getVideoUrlsAscendingByLimit,
            getVideoUrlsDescendingByLimit: getVideoUrlsDescendingByLimit
        };
        
        function getVideoUrls(stationId, fromTimestamp, toTimestamp, limit) {
            var resource = $resource('/api/video_urls_by_station/:station_id/:from_timestamp/:to_timestamp/:limit', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp,
                        limit: limit
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                    station_id: stationId, 
                    from_timestamp: fromTimestamp,
                    to_timestamp: toTimestamp,
                    limit: limit
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
        
        function getVideoUrlsToTimestamp(stationId, toTimestamp, limit) {
            var resource = $resource('/api/video_urls_by_station/:station_id/:to_timestamp/:limit', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        to_timestamp: toTimestamp,
                        limit: limit
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                    station_id: stationId, 
                    to_timestamp: toTimestamp,
                    limit: limit
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
        
        function getVideoUrlsAscendingByLimit(stationId, limit) {
            var resource = $resource('/api/video_urls_by_station_asc_limit/:station_id/:limit', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        limit: limit
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                    station_id: stationId, 
                    limit: limit
                }).$promise
                .then(getVideoUrlsAscendingByLimitComplete)
                .catch(getVideoUrlsAscendingByLimitFailed);
                
            function getVideoUrlsAscendingByLimitComplete(response) {
                return response;
            }
            
            function getVideoUrlsAscendingByLimitFailed(error) {
                console.log(error);
            }
        }
        
        function getVideoUrlsDescendingByLimit(stationId, limit) {
            var resource = $resource('/api/video_urls_by_station_desc_limit/:station_id/:limit', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        limit: limit
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                    station_id: stationId, 
                    limit: limit
                }).$promise
                .then(getVideoUrlsDescendingByLimitComplete)
                .catch(getVideoUrlsDescendingByLimitFailed);
                
            function getVideoUrlsDescendingByLimitComplete(response) {
                return response;
            }
            
            function getVideoUrlsDescendingByLimitFailed(error) {
                console.log(error);
            }
        }

    }
    
})();
