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
            getLiveWebcams: getLiveWebcams,
            getLocation: getLocation,
            getLocations: getLocations,
            getStations: getStations,
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
        
        function getStations(locationId) {
            var resource = $resource('/api/stations_by_location/:location_id', {}, {
                query: {
                    method: 'GET', params: {
                        location_id: locationId, 
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({location_id: locationId}).$promise
                .then(getStationsComplete)
                .catch(getStationsFailed);
                
            function getStationsComplete(response) {
                return response;
            }
            
            function getStationsFailed(error) {
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
