angular.module('app.services', [])
.factory('Parameters', function($resource) {
    return {
        parameters_by_location: $resource('/api/parameters_by_location/:location_id/', {}, {
        query: { method: 'GET', params: {location_id: '@location_id'}, isArray: true }
    })
};
});
