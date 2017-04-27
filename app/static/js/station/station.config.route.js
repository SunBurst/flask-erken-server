(function() {
    'use strict';
    
    angular
        .module('app.station')
        .config(config);
        
    function config($stateProvider) {
        
        $stateProvider
            .state('station', {
                url: '/station/:station_id',
                templateUrl: 'static/partials/station/station.html',
                controller: 'StationCtrl',
                controllerAs: 'stationVm',
                resolve: {
                    _station: function($stateParams, StationFactory, stationStorage) {
                        var stationId = $stateParams.station_id;
                        return StationFactory.getStation(stationId)
                            .then(function(response) {
                                var data = response.data;
                                stationStorage.setStation(data);
                                return data;
                            });
                    }
                }
            })
            .state('station.overview', {
                url: '/overview',
                templateUrl: '/static/partials/station/station-overview.html',
                controller: 'StationOverviewCtrl',
                controllerAs: 'stationOverviewVm',
                resolve: {
                    _sensors: function($stateParams, StationSensorsFactory, stationStorage) {
                        var stationId = $stateParams.station_id;
                        return StationSensorsFactory.getSensors(stationId)
                            .then(function(response) {
                                var data = response.data;
                                var initObjects = true;
                                stationStorage.setSensorList(data, initObjects);
                                return data;
                            });
                    }
                }
                
            })
            .state('station.data', {
                url: '/data',
                templateUrl: '/static/partials/station/station-data.html',
                controller: 'StationDataCtrl',
                controllerAs: 'stationDataVm',
                resolve: {
                    _parametersAllMeasurementTypes: function($stateParams, StationParametersFactory, stationStorage) {
                        var stationId = $stateParams.station_id;
                        return StationParametersFactory.getParametersAllMeasurementTypes(stationId)
                            .then(function(response) {
                                var data = response.data;
                                var initObjects = true;
                                stationStorage.setParametersAllMeasurementTypesList(data, initObjects);
                                return data;
                            });
                    },
                    _parameterAllMeasurementTypesSelection: ['_parametersAllMeasurementTypes', 'stationDataStorage', function(_parametersAllMeasurementTypes, stationDataStorage) {
                        return stationDataStorage.setParametersAllMeasurementTypesSelection(_parametersAllMeasurementTypes);
                    }]
                }
            })
            .state('station.data.charts', {
                url: '/charts',
                templateUrl: '/static/partials/station/station-data-charts.html',
                controller: 'StationDataChartsCtrl',
                controllerAs: 'stationDataChartsVm',
            })
            .state('station.data.tables', {
                url: '/tables',
                templateUrl: '/static/partials/station/station-data-tables.html',
                controller: 'StationDataTablesCtrl',
                controllerAs: 'stationDataTablesVm'
            })
            .state('station.cams-and-photos', {
                url: '/cams-and-photos',
                templateUrl: '/static/partials/station/station-cams-and-photos.html',
                controller: 'StationCamsAndPhotosCtrl',
                controllerAs: 'stationCamsAndPhotosVm',
                resolve: {}
                
            })
    
    }
    
})();
