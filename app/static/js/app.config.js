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
                url: '/location/:location_id',
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
                    }
                }
        })
        .state('location.overview', {
            url: '/overview',
            templateUrl: '/static/partials/location/location-overview.html',
            controller: 'LocationOverview',
            controllerAs: 'vm',
            resolve: {
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
            
        })
        .state('location.data', {
            url: '/data',
            templateUrl: '/static/partials/location/location-data.html',
            controller: 'LocationData',
            controllerAs: 'vm',
            resolve: {
                parametersByLocation: function($stateParams, LocationsFactory, activeLocation, activeLocationDataFactory) {
                    var locationId = $stateParams.location_id;
                    return LocationsFactory.getParameters(locationId)
                        .then(function(response) {
                            var data = response.data;
                            activeLocation.setActiveLocationParameters(data);
                            activeLocationDataFactory.activeLocationParametersSelection = data;
                            return data;
                        });
                },
                
            }
            
        })
        .state('location.data.charts', {
            url: '/charts',
            templateUrl: '/static/partials/location/location-data-charts.html',
            controller: 'LocationDataCharts',
            controllerAs: 'chartsVm'
        })
        .state('location.data.tables', {
            url: '/tables',
            templateUrl: '/static/partials/location/location-data-tables.html',
            controller: 'LocationDataTables',
            controllerAs: 'vm'
        })
        .state('location.cams-and-photos', {
            url: '/cams-and-photos',
            templateUrl: '/static/partials/location/location-cams-and-photos.html',
            controller: 'LocationCamsAndPhotos',
            controllerAs: 'vm',
            
        })
        .state('location.status', {
            url: '/status',
            templateUrl: '/static/partials/location/location-status.html',
            controller: 'LocationStatus',
            controllerAs: 'vm',
            
        })
        .state('station', {
            url: '/location/:location_id/station/:station_id/',
            templateUrl: 'static/partials/station/station.html',
            controller: 'Location',
            controllerAs: 'vm'
        });
        
        $urlRouterProvider.otherwise('/start');
    }
    
})();
