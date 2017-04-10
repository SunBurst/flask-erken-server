(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('LocationWebcamsFactory', LocationWebcamsFactory);
    
    LocationWebcamsFactory.$inject = ['$resource'];
    
    function LocationWebcamsFactory($resource) {

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
        
        function getLiveWebcams(locationId) {
            var resource = $resource('/api/livewebcams_by_location/:location_id', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId, 
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({location_id: locationId}).$promise
                .then(getLiveWebcamsComplete)
                .catch(getLiveWebcamsFailed);
                
            function getLiveWebcamsComplete(response) {
                return response;
            }
            
            function getLiveWebcamsFailed(error) {
                console.log(error);
            }
        }
        
        function getWebcamPhotosOnDate(locationId, onDate) {
            var resource = $resource('/api/webcam_photos_by_location/:location_id/:on_date', {}, {
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
                .then(getWebcamPhotosOnDateComplete)
                .catch(getWebcamPhotosOnDateFailed);
                
            function getWebcamPhotosOnDateComplete(response) {
                return response;
            }
            
            function getWebcamPhotosOnDateFailed(error) {
                console.log(error);
            }
        }
        
        function getWebcamPhotos(locationId, fromTimestamp, toTimestamp) {
            var resource = $resource('/api/webcam_photos_by_location/:location_id/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                        
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                    location_id: locationId, 
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
        
        function getWebcamPhotosByLimit(locationId, limit) {
            var resource = $resource('/api/webcam_photos_by_location_by_limit/:location_id/:limit/', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId,
                        limit: limit,
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({location_id: locationId, limit: limit}).$promise
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
