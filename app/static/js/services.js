'use strict';

angular.module('app.services', [])
.factory('Locations', function($resource) {
    return {
        locations: $resource('/api/locations/', {}, {
        query: { method: 'GET', isArray: true }
    }),
        location: $resource('api/location/:location_id/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id'}, isArray: false }
    }),
        stations_by_location: $resource('api/stations_by_location/:location_id/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id'}, isArray: true }
    })
};
})
.factory('Parameters', function($resource) {
    return {
        parameters_by_location: $resource('/api/parameters_by_location/:location_id/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id'}, isArray: true }
    })
};
});

