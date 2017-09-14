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
                    //_parametersAllMeasurementTypes: function($stateParams, StationParametersFactory, stationStorage) {
                    //    var stationId = $stateParams.station_id;
                    //    return StationParametersFactory.getParametersAllMeasurementTypes(stationId)
                    //        .then(function(response) {
                    //            var data = response.data;
                    //            var initObjects = true;
                    //            stationStorage.setParametersAllMeasurementTypesList(data, initObjects);
                    //            return data;
                    //        });
                    //},
                    //_parameterAllMeasurementTypesSelection: ['_parametersAllMeasurementTypes', 'stationDataStorage', function(_parametersAllMeasurementTypes, stationDataStorage) {
                    //    return stationDataStorage.setParametersAllMeasurementTypesSelection(_parametersAllMeasurementTypes);
                    //}],
                    //_measurementFrequencies: function($stateParams, stationMeasurements, stationDataStorage) {
                    //    var stationId = $stateParams.station_id;
                    //    return stationMeasurements.getMeasurementFrequencies(stationId)
                    //    .then(function(response) {
                    //        var data = response.data;
                    //        return stationDataStorage.setMeasurementFrequencies(data);
                    //    });
                    //}
                }
            })
            .state('station.data.frequency', {
                url: '/frequency/:frequency',
                templateUrl: '/static/partials/station/station-data-frequency.html',
                controller: 'StationDataFrequencyCtrl',
                controllerAs: 'stationDataFrequencyVm',
            })
            .state('station.data.groups', {
                url: '/groups',
                templateUrl: '/static/partials/station/station-data-groups.html',
                controller: 'StationDataGroupsCtrl',
                controllerAs: 'stationDataGroupsVm',
                resolve: {
                    _station: function(stationStorage) {
                        var station = stationStorage.getStation();
                        return station;
                    },
                    _groupList: function($stateParams, StationGroupsFactory) {
                        var stationId = $stateParams.station_id;
                        return StationGroupsFactory.getGroups(stationId)
                            .then(function(response) {
                                return response.data;
                            });
                    },
                    _groupsParameterList: ['$stateParams', 'StationGroupsFactory', 
                        function($stateParams, StationGroupsFactory) {
                            var stationId = $stateParams.station_id;
                            return StationGroupsFactory.getGroupsParameters(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _getGroupsParameters: ['_groupsParameterList', function(_groupsParameterList) {
                        var groupsParameters = {};
                        for (var i = 0; i < _groupsParameterList.length; i++) {
                            var groupId = _groupsParameterList[i].group_id;
                            var groupNotInObject = !(groupId in groupsParameters);
                            if (groupNotInObject) {
                                groupsParameters[groupId] = [];
                            }
                            groupsParameters[groupId].push(_groupsParameterList[i]);
                        }
                        return groupsParameters;
                    }],
                    _groupUnits: ['_groupsParameterList', function(_groupsParameterList) {
                        var groupUnits = {};
                        
                        for (var i = 0; i < _groupsParameterList.length; i++) {
                            var groupId = _groupsParameterList[i].group_id;
                            var groupNotInObject = !(groupId in groupUnits);
                            
                            if (groupNotInObject) {
                                groupUnits[groupId] = [];
                            }
                            
                            var parameterUnit = _groupsParameterList[i].parameter_unit;
                            var unitNotInObject = !(parameterUnit in groupUnits[groupId]);
                            
                            if (unitNotInObject) {
                                groupUnits[groupId].push(parameterUnit);
                            }
                        }
                        
                        return groupUnits;

                    }],
                    _groupMeasurementFrequenciesList: ['$stateParams', 'StationGroupsFactory', 
                        function($stateParams, StationGroupsFactory) {
                            var stationId = $stateParams.station_id;
                            return StationGroupsFactory.getGroupMeasurementFrequencies(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _groupMeasurementFrequencies: ['_groupMeasurementFrequenciesList', 
                        function(_groupMeasurementFrequenciesList) {
                            var groupsMeasurementFrequencies = {};
                            for (var i = 0; i < _groupMeasurementFrequenciesList.length; i++) {
                                groupsMeasurementFrequencies[_groupMeasurementFrequenciesList[i].group_id] = _groupMeasurementFrequenciesList[i];
                                if (i == 0) {
                                    groupsMeasurementFrequencies[_groupMeasurementFrequenciesList[i].group_id]['selected'] = 0;
                                }
                            }
                        return groupsMeasurementFrequencies;
                    }],
                    _groups: ['_groupList', '_getGroupsParameters', '_groupMeasurementFrequencies', '_groupUnits', 
                        function(_groupList, _getGroupsParameters, _groupMeasurementFrequencies, _groupUnits) {
                        var groups = {};
                        
                        for (var i = 0; i < _groupList.length; i++) {
                            var groupId = _groupList[i].group_id;
                            groups[groupId] = _groupList[i];
                            groups[groupId]['parameters'] = {
                                'list': [],
                                'objects': {}
                            };
                            groups[groupId]['frequencies'] = {
                                'list': [],
                                'selected': null
                            };
                            groups[groupId]['units'] = {
                                'list': []
                            };
                            
                            var groupInParameters = (groupId in _getGroupsParameters);

                            if (groupInParameters) {
                                groups[groupId].parameters.list = _getGroupsParameters[groupId];
                                for (var j = 0; j < _getGroupsParameters[groupId].length; j++) {
                                    var parameterId = _getGroupsParameters[groupId][j].parameter_id;
                                    groups[groupId].parameters.objects[parameterId] = {
                                        'parameter_description': _getGroupsParameters[groupId][j].parameter_description,
                                        'parameter_name': _getGroupsParameters[groupId][j].parameter_name,
                                        'parameter_unit': _getGroupsParameters[groupId][j].parameter_unit
                                    };
                                }
                            }
                            
                            var groupInMeasurementFrequencies = (groupId in _groupMeasurementFrequencies);

                            if (groupInMeasurementFrequencies) {
                                groups[groupId].frequencies.list = _groupMeasurementFrequencies[groupId].measurement_frequencies;
                                groups[groupId].frequencies.selected = _groupMeasurementFrequencies[groupId].selected;
                            }
                            
                            var groupInUnits = (groupId in _groupUnits);
                            
                            if (groupInUnits) {
                                groups[groupId].units.list = _groupUnits[groupId];
                            }
                            
                        }
    
                        return groups;
                    }]
                }
            })
            .state('station.data.parameters', {
                url: '/parameters',
                templateUrl: '/static/partials/station/station-data-parameters.html',
                controller: 'StationDataFrequencyParametersCtrl',
                controllerAs: 'StationDataFrequencyParametersVm',
            })
            .state('station.data.sensors', {
                url: '/sensors',
                templateUrl: '/static/partials/station/station-data -sensors.html',
                controller: 'StationDataFrequencySensorsCtrl',
                controllerAs: 'StationDataFrequencySensorsVm',
            })
            .state('station.data.frequency.charts', {
                url: '/charts',
                templateUrl: '/static/partials/station/station-data-charts.html',
                controller: 'StationDataChartsCtrl',
                controllerAs: 'stationDataChartsVm',
            })
            .state('station.data.frequency.tables', {
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
                resolve: {
                    _liveWebcams: function($stateParams, StationWebcamsFactory, stationStorage) {
                        var stationId = $stateParams.station_id;
                        return StationWebcamsFactory.getLiveWebcams(stationId)
                            .then(function(response) {
                                var data = response.data;
                                stationStorage.setLiveWebcamList(data);
                                return data;
                            });
                    }
                }
                
            })
    
    }
    
})();
