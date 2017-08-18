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
                    _groups: function($stateParams, StationGroupsFactory, stationDataStorage) {
                        var stationId = $stateParams.station_id;
                        return StationGroupsFactory.getGroups(stationId)
                            .then(function(response) {
                                return response.data;
                            });
                    },
                    _groupsObj: ['_groups', function(_groups) {
                        var groupsObj = {};
                        for (var i = 0; i < _groups.length; i++) {
                            groupsObj[_groups[i].group_id] = _groups[i];
                        }
                        return groupsObj;
                    }],
                    _groupsParameterList: ['$stateParams', 'StationGroupsFactory', 
                        function($stateParams, StationGroupsFactory) {
                            var stationId = $stateParams.station_id;
                            return StationGroupsFactory.getGroupsParameters(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _groupParameterList: ['_groups', '$q', '$stateParams', 'StationGroupsFactory', 'stationDataStorage', 
                        function(_groups, $q, $stateParams, StationGroupsFactory, stationDataStorage) {
                            var itemArray = []
                            if (_groups.length > 0) {
                                var stationId = $stateParams.station_id;
                                var promiseArray = [];
                                for (var i = 0; i < _groups.length; i++) {
                                  var groupId = _groups[i].group_id;
                                  var currentPromise = StationGroupsFactory.getGroupParameters(stationId, groupId)
                                    .then(function (response) {
                                        var data = response.data;
                                        itemArray.push(data);
                                        return true; 
                                  });
                                  promiseArray.push(currentPromise);
                                }
                                $q.all(promiseArray) 
                                .then(function(data){ 
                                    return data;
                                },function(error){
                                    console.log("Error occured")
                                });

                            }
                            return itemArray;
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
                    _groupCharts: ['_groups', '_groupUnits', 'GroupHighChartOptions', function(_groups, _groupUnits, GroupHighChartOptions) {
                        
                        var groupCharts = {};
                        
                        for (var i = 0; i < _groups.length; i++) {
                
                            var groupId = _groups[i].group_id;
                            var groupNotInObject = !(groupId in groupCharts);
                            var chartId = 'chart-' + i;
                            
                            if (groupNotInObject) {
                                groupCharts[groupId] = {
                                    'chartId': chartId,
                                    'chartConfig': angular.copy(GroupHighChartOptions)
                                };
                            }
                            
                            var groupParameterUnits = _groupUnits[groupId];
                            if (groupParameterUnits) {
                                for (var j = 0; j < groupParameterUnits.length; j++) {
                                    var unit = groupParameterUnits[j];
                                    var unitIndex = j;
                                    var axis = {
                                        labels: {
                                            format: '{value} ' + unit,
                                        },
                                        opposite: (unitIndex % 2 == 0) ? true : false
                                    }
                                    
                                    groupCharts[groupId].chartConfig.yAxis.push(axis);
                                }
                            }

                        }
                        
                        return groupCharts;
                        
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
