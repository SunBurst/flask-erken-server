(function() {
    
    'use strict';
    
    angular
        .module('app.location')
        .config(config);
        
    function config($stateProvider) {
        
        $stateProvider
            .state('location', {
                url: '/location/:location_id',
                templateUrl: 'static/partials/location/location.html',
                controller: 'Location',
                controllerAs: 'vm',
                resolve: {
                    resolvedLocation: function($stateParams, location, locationStorage) {
                        var locationId = $stateParams.location_id;
                        return location.getLocation(locationId)
                            .then(function(response) {
                                var data = response.data;
                                locationStorage.setLocation(data);
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
                    resolvedStations: function($stateParams, locationStations, locationStorage) {
                        var locationId = $stateParams.location_id;
                        return locationStations.getStations(locationId)
                            .then(function(response) {
                                var data = response.data;
                                var initObjects = true;
                                locationStorage.setStationList(data, initObjects);
                                return data;
                            });
                    },
                    resolvedLastWebcamPhoto: function($stateParams, locationWebcams, locationStorage) {
                        var locationId = $stateParams.location_id;
                        return locationWebcams.getWebcamPhotos(locationId, 1)
                            .then(function(response) {
                                var data = {};
                                if (response.data[0]) {
                                    data = response.data[0]
                                }
                                locationStorage.setLastWebcamPhoto(data);
                                return data;
                            });
                    },
                    resolvedLiveWebcams: function($stateParams, locationWebcams, locationStorage) {
                        var locationId = $stateParams.location_id;
                        return locationWebcams.getLiveWebcams(locationId)
                            .then(function(response) {
                                var data = response.data;
                                locationStorage.setLiveWebcamList(data);
                                return data;
                            });
                    },
                    resolvedWebcamPhotos: function($stateParams, locationWebcams, locationStorage) {
                        var locationId = $stateParams.location_id;
                        return locationWebcams.getWebcamPhotos(locationId, 7)
                            .then(function(response) {
                                var data = response.data;
                                locationStorage.setWebcamPhotosList(data);
                                return data;
                            });
                    }
                }
                
            })
            .state('location.data', {
                url: '/data',
                templateUrl: '/static/partials/location/location-data.html',
                controller: 'LocationData',
                controllerAs: 'locationDataVm',
                resolve: {
                    resolvedParameters: function($stateParams, locationParameters, locationStorage) {
                        var locationId = $stateParams.location_id;
                        return locationParameters.getParameters(locationId)
                            .then(function(response) {
                                var data = response.data;
                                var initObjects = true;
                                locationStorage.setParameterList(data, initObjects);
                                return data;
                            });
                    },
                    resolvedParameterSelection: ['resolvedParameters', 'locationDataStorage', function(resolvedParameters, locationDataStorage) {
                        return locationDataStorage.setParameterSelection(resolvedParameters);
                    }]
                }
            })
            .state('location.data.charts', {
                url: '/charts',
                templateUrl: '/static/partials/location/location-data-charts.html',
                controller: 'LocationDataCharts',
                controllerAs: 'chartsVm',
                //resolve: {
                //    parameterChartsByLocation: function(parametersByLocation, activeLocationDataChartsFactory) {
                //        activeLocationDataChartsFactory.setActiveLocationParametersChartsLookup(parametersByLocation);
                //    }
                //}
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
                
            });
    
    }
    
})();
