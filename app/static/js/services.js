'use strict';

angular.module('app.services', [])
.factory('Locations', function($resource) {
    return {
        locations: $resource('/api/locations/', {}, {
        query: { method: 'GET', isArray: true }
    }),
        location: $resource('/api/location/:location_id/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id'}, isArray: false }
    }),
        stations_by_location: $resource('/api/stations_by_location/:location_id/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id'}, isArray: true }
    })
};
})
.factory('Measurements', function($resource) {
    return {
        daily_parameter_measurements_by_location: $resource('/api/daily_parameter_measurements_by_location/:location_id/:parameter_id/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id', parameter_id: '@parameter_id'}, isArray: true }
    }),
        hourly_parameter_measurements_by_location: $resource('/api/hourly_parameter_measurements_by_location/:location_id/:parameter_id/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id', parameter_id: '@parameter_id'}, isArray: true }
    })
};
})
.factory('Parameters', function($resource) {
    return {
        parameters_by_location: $resource('/api/parameters_by_location/:location_id/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id'}, isArray: true }
    })
};
})
.factory('Webcams', function($resource) {
    return {
        livewebcams_by_location: $resource('/api/livewebcams_by_location/:location_id/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id'}, isArray: true }
    }),
        webcam_photos_by_location: $resource('/api/webcam_photos_by_location/:location_id/:limit/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id'}, isArray: true }
    }),
        last_webcam_photo_by_location: $resource('/api/webcam_photos_by_location/:location_id/:limit/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id', limit: '@limit'}, isArray: true }
    })
};
});

