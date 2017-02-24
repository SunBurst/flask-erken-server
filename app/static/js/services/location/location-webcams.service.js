(function() {
    
    'use strict';
    
    angular
        .module('app.services')
        .factory('locationWebcams', locationWebcams);
    
    locationWebcams.$inject = ['$resource'];
    
    function locationWebcams($resource) {

        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getLiveWebcams: getLiveWebcams,
            getWebcamPhotos: getWebcamPhotos
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
        
        function getWebcamPhotos(locationId, limit) {
            var resource = $resource('/api/webcam_photos_by_location/:location_id/:limit/', {}, {
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
                .then(getWebcamPhotosComplete)
                .catch(getWebcamPhotosFailed);
                
            function getWebcamPhotosComplete(response) {
                return response;
            }
            
            function getWebcamPhotosFailed(error) {
                console.log(error);
            }
        }
        
    }

})();
