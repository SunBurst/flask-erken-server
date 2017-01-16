'use strict';

angular.module('app.services', []).factory('Location', function($resource) {
  return $resource('/api/locations/:id', { id: 'id' }, {
    get: {
      method: 'GET'
    }
  });
});
