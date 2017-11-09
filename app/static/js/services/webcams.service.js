angular.module('app.services', [])
.factory('Webcams', function($resource) {
    return {
        livewebcams_by_location: $resource('/api/livewebcams_by_location/:location_id/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id'}, isArray: true }
    }),
        webcam_photos_by_location: $resource('/api/hourly_webcam_photos_by_location/:location_id/:limit/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id'}, isArray: true }
    }),
        last_webcam_photo_by_location: $resource('/api/hourly_webcam_photos_by_location/:location_id/:limit/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id', limit: '@limit'}, isArray: true }
    })
};
});
