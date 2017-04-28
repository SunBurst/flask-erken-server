(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('StationWebcamsFactory', StationWebcamsFactory);
    
    StationWebcamsFactory.$inject = ['$resource'];
    
    function StationWebcamsFactory($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getLiveWebcams: getLiveWebcams,
            getWebcamPhotos: getWebcamPhotos,
            getWebcamPhotosByLimit: getWebcamPhotosByLimit
        };
        
        function getLiveWebcams(stationId) {
            var resource = $resource('/api/webcam_live_urls_by_station/:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId, 
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getLiveWebcamsComplete)
                .catch(getLiveWebcamsFailed);
                
            function getLiveWebcamsComplete(response) {
                return response;
            }
            
            function getLiveWebcamsFailed(error) {
                console.log(error);
            }
        }
        
        function getWebcamPhotosOnDate(stationId, onDate) {
            var resource = $resource('/api/webcam_photos_by_station/:station_id/:on_date', {}, {
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
                .then(getWebcamPhotosOnDateComplete)
                .catch(getWebcamPhotosOnDateFailed);
                
            function getWebcamPhotosOnDateComplete(response) {
                return response;
            }
            
            function getWebcamPhotosOnDateFailed(error) {
                console.log(error);
            }
        }
        
        function getWebcamPhotos(stationId, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/webcam_photos_by_station/:station_id/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                        
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                    station_id: stationId, 
                    from_timestamp: fromTimestamp, 
                    to_timestamp: toTimestamp
                }).$promise
                .then(getWebcamPhotosComplete)
                .catch(getWebcamPhotosFailed);
                
            function getWebcamPhotosComplete(response) {
                return response;
            }
            
            function getWebcamPhotosFailed(error) {
                console.log(error);
            }
        }
        
        function getWebcamPhotosByLimit(stationId, limit) {
            var resource = $resource('/api/webcam_photos_by_station_by_limit/:station_id/:limit/', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        limit: limit,
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId, limit: limit}).$promise
                .then(getWebcamPhotosByLimitComplete)
                .catch(getWebcamPhotosByLimitFailed);
                
            function getWebcamPhotosByLimitComplete(response) {
                return response;
            }
            
            function getWebcamPhotosByLimitFailed(error) {
                console.log(error);
            }
        }
        
    }

})();
