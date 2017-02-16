(function() {
    
    'use strict';
    
    angular
        .module('app')
        .config(config);
    
    function config($qProvider, $interpolateProvider, $urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
        
        $qProvider.errorOnUnhandledRejections(false)
        
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');
        
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');

        $stateProvider
            .state('start', {
                url: '/start',
                templateUrl: 'static/partials/start/start.html',
                controller: 'Start',
                controllerAs: 'vm'
            })
            .state('location', {
                url: '/location/:location_id/',
                templateUrl: 'static/partials/location/location.html',
                controller: 'Location',
                controllerAs: 'vm',
                resolve: {
                    location: function($stateParams, LocationsFactory, activeLocation) {
                        var locationId = $stateParams.location_id;
                        return LocationsFactory.getLocation(locationId)
                            .then(function(response) {
                                var data = response.data;
                                activeLocation.setActiveLocation(data);
                                return data;
                            });
                    },
                    stationsByLocation: function($stateParams, LocationsFactory, activeLocation) {
                        var locationId = $stateParams.location_id;
                        return LocationsFactory.getStations(locationId)
                            .then(function(response) {
                                var data = response.data;
                                activeLocation.setActiveLocationStations(data);
                                return data;
                            });
                    },
                    lastWebcamPhotoByLocation: function($stateParams, LocationsFactory, activeLocation) {
                        var locationId = $stateParams.location_id;
                        return LocationsFactory.getWebcamPhotos(locationId, 1)
                            .then(function(response) {
                                var data = response.data[0];
                                activeLocation.setActiveLocationLastWebcamPhoto(data);
                                return data;
                            });
                    },
                    liveWebcamsByLocation: function($stateParams, LocationsFactory, activeLocation) {
                        var locationId = $stateParams.location_id;
                        return LocationsFactory.getLiveWebcams(locationId)
                            .then(function(response) {
                                var data = response.data;
                                activeLocation.setActiveLocationLiveWebcams(data);
                                return data;
                            });
                    },
                    webcamPhotosByLocation: function($stateParams, LocationsFactory, activeLocation) {
                        var locationId = $stateParams.location_id;
                        return LocationsFactory.getWebcamPhotos(locationId, 7)
                            .then(function(response) {
                                var data = response.data;
                                activeLocation.setActiveLocationWebcamPhotos(data);
                                return data;
                            });
                    }
                }
        });
        
        $urlRouterProvider.otherwise('/start');
    }
    
})();
