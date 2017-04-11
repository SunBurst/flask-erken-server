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
                controller: 'LocationCtrl',
                controllerAs: 'locationVm',
                resolve: {
                    _location: function($stateParams, LocationFactory, locationStorage) {
                        var locationId = $stateParams.location_id;
                        return LocationFactory.getLocation(locationId)
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
                controller: 'LocationOverviewCtrl',
                controllerAs: 'locationOverviewVm',
                resolve: {
                    _stations: function($stateParams, LocationStationsFactory, locationStorage) {
                        var locationId = $stateParams.location_id;
                        return LocationStationsFactory.getStations(locationId)
                            .then(function(response) {
                                var data = response.data;
                                var initObjects = true;
                                locationStorage.setStationList(data, initObjects);
                                return data;
                            });
                    }
                }
                
            })
            .state('location.data', {
                url: '/data',
                templateUrl: '/static/partials/location/location-data.html',
                controller: 'LocationDataCtrl',
                controllerAs: 'locationDataVm',
                resolve: {
                    _parametersAllMeasurementTypes: function($stateParams, LocationParametersFactory, locationStorage) {
                        var locationId = $stateParams.location_id;
                        return LocationParametersFactory.getParametersAllMeasurementTypes(locationId)
                            .then(function(response) {
                                var data = response.data;
                                var initObjects = true;
                                locationStorage.setParametersAllMeasurementTypesList(data, initObjects);
                                return data;
                            });
                    },
                    _parameterAllMeasurementTypesSelection: ['_parametersAllMeasurementTypes', 'locationDataStorage', function(_parametersAllMeasurementTypes, locationDataStorage) {
                        return locationDataStorage.setParametersAllMeasurementTypesSelection(_parametersAllMeasurementTypes);
                    }]
                }
            })
            .state('location.data.charts', {
                url: '/charts',
                templateUrl: '/static/partials/location/location-data-charts.html',
                controller: 'LocationDataChartsCtrl',
                controllerAs: 'locationDataChartsVm',
            })
            .state('location.data.tables', {
                url: '/tables',
                templateUrl: '/static/partials/location/location-data-tables.html',
                controller: 'LocationDataTables',
                controllerAs: 'locationDataTablesVm'
            })
            .state('location.cams-and-photos', {
                url: '/cams-and-photos',
                templateUrl: '/static/partials/location/location-cams-and-photos.html',
                controller: 'LocationCamsAndPhotosCtrl',
                controllerAs: 'locationCamsAndPhotosVm',
                resolve: {
                    _liveWebcams: function($stateParams, LocationWebcamsFactory, locationStorage) {
                        var locationId = $stateParams.location_id;
                        return LocationWebcamsFactory.getLiveWebcams(locationId)
                            .then(function(response) {
                                var data = response.data;
                                locationStorage.setLiveWebcamList(data);
                                return data;
                            });
                    }
                }
                
            })
            .state('location.status', {
                url: '/status',
                templateUrl: '/static/partials/location/location-status.html',
                controller: 'LocationStatus',
                controllerAs: 'locationStatusVm',
                resolve: {
                    resolvedStatusParameters: function($stateParams, locationStatusParameters, locationStorage) {
                        var locationId = $stateParams.location_id;
                        return locationStatusParameters.getStatusParameters(locationId)
                            .then(function(response) {
                                var data = response.data;
                                var initObjects = true;
                                locationStorage.setStatusParameterList(data, initObjects);
                                return data;
                            });
                    },
                    resolvedStatusParameterSelection: ['resolvedStatusParameters', 'locationStatusStorage', function(resolvedStatusParameters, locationStatusStorage) {
                        return locationStatusStorage.setStatusParameterSelection(resolvedStatusParameters);
                    }]
                }
            })
            .state('location.status.charts', {
                url: '/charts',
                templateUrl: '/static/partials/location/location-status-charts.html',
                controller: 'LocationStatusCharts',
                controllerAs: 'locationStatusChartsVm',
            })
            .state('location.status.tables', {
                url: '/tables',
                templateUrl: '/static/partials/location/location-status-tables.html',
                controller: 'LocationStatusTables',
                controllerAs: 'locationStatusTablesVm'
            });
    
    }
    
})();
