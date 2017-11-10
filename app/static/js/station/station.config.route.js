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
                abstract: true,
                controller: 'StationCtrl',
                controllerAs: 'stationVm',
                redirectTo: 'station.overview',
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
                    _sensors: function($stateParams, StationSensorsFactory) {
                        var stationId = $stateParams.station_id;
                        return StationSensorsFactory.getSensors(stationId)
                            .then(function(response) {
                                return response.data;
                            });
                    },
                    _groups: ['$stateParams', 'StationGroupsFactory', 
                        function($stateParams, StationGroupsFactory) {
                            var stationId = $stateParams.station_id;
                            return StationGroupsFactory.getGroups(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _parameters: ['$stateParams', 'StationParametersFactory', 
                        function($stateParams, StationParametersFactory) {
                            var stationId = $stateParams.station_id;
                            return StationParametersFactory.getParameters(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                }
                
            })
            .state('station.data', {
                url: '/data',
                templateUrl: '/static/partials/station/station-data.html',
                abstract: true,
                controller: 'StationDataCtrl',
                controllerAs: 'stationDataVm'
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
                            }
                            return groupsMeasurementFrequencies;
                    }],
                    _groupsQCLevelList: ['$stateParams', 'StationGroupsFactory', 
                        function($stateParams, StationGroupsFactory) {
                            var stationId = $stateParams.station_id;
                            return StationGroupsFactory.getGroupsQCLevels(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _groupsQCLevels: ['_groupsQCLevelList', function(_groupsQCLevelList) {
                        var groupsQCLevels = {};
                        for (var i = 0; i < _groupsQCLevelList.length; i++) {
                            var groupId = _groupsQCLevelList[i].group_id;
                            var groupNotInObject = !(groupId in groupsQCLevels);
                            if (groupNotInObject) {
                                groupsQCLevels[groupId] = [];
                            }
                            groupsQCLevels[groupId].push(_groupsQCLevelList[i]);
                        }
                        return groupsQCLevels;
                    }],
                    _groups: ['_groupList', '_getGroupsParameters', '_groupMeasurementFrequencies', '_groupUnits', '_groupsQCLevels',
                        function(_groupList, _getGroupsParameters, _groupMeasurementFrequencies, _groupUnits, _groupsQCLevels) {
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
                                'selected': undefined
                            };
                            groups[groupId]['units'] = {
                                'list': []
                            };
                            groups[groupId]['qc_levels'] = {
                                'list': [],
                                'selected': [],
                                'objects': {}
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
                                groups[groupId].frequencies.selected = 'Dynamic';
                            }
                            
                            var groupInUnits = (groupId in _groupUnits);
                            
                            if (groupInUnits) {
                                groups[groupId].units.list = _groupUnits[groupId];
                            }
                            
                            var groupInQCLevels = (groupId in _groupsQCLevels);
                            
                            if (groupInQCLevels) {
                                groups[groupId].qc_levels.list = _groupsQCLevels[groupId];
                                for (var j = 0; j < _groupsQCLevels[groupId].length; j++) {
                                    var qcLevel = _groupsQCLevels[groupId][j].qc_level;
                                    var noQCLevelSelected = !(groups[groupId].qc_levels.selected.length);
                                    if (noQCLevelSelected) {
                                        groups[groupId].qc_levels.selected.push(qcLevel);
                                    }
                                    
                                    groups[groupId].qc_levels.objects[qcLevel] = {
                                        'qc_description': _groupsQCLevels[groupId][j].qc_description
                                    };
                                }
                            }
                            
                        }

                        return groups;
                    }]
                }
            })
            .state('station.data.parameters', {
                url: '/parameters',
                templateUrl: '/static/partials/station/station-data-parameters.html',
                controller: 'StationDataParametersCtrl',
                controllerAs: 'stationDataParametersVm',
                resolve: {
                    _station: function(stationStorage) {
                        var station = stationStorage.getStation();
                        return station;
                    }, 
                    _parameterList: ['$stateParams', 'StationParametersFactory', 
                        function($stateParams, StationParametersFactory) {
                            var stationId = $stateParams.station_id;
                            return StationParametersFactory.getParameters(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _parameterMeasurementFrequenciesList: ['$stateParams', 'StationParametersFactory', 
                        function($stateParams, StationParametersFactory) {
                            var stationId = $stateParams.station_id;
                            return StationParametersFactory.getParameterMeasurementFrequencies(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _parameterMeasurementFrequencies: ['_parameterMeasurementFrequenciesList', 
                        function(_parameterMeasurementFrequenciesList) {
                            var parameterMeasurementFrequencies = {};
                            for (var i = 0; i < _parameterMeasurementFrequenciesList.length; i++) {
                                var parameterId = _parameterMeasurementFrequenciesList[i].parameter_id;
                                var parameterType = _parameterMeasurementFrequenciesList[i].parameter_type;
                                var parameterNotInObject = !(parameterId in parameterMeasurementFrequencies);
                                if (parameterNotInObject) {
                                    parameterMeasurementFrequencies[parameterId] = {};
                                }
                                var parameterTypeNotInObject = !(parameterType in parameterMeasurementFrequencies[parameterId]);
                                if (parameterTypeNotInObject) {
                                    parameterMeasurementFrequencies[parameterId][parameterType] = _parameterMeasurementFrequenciesList[i].measurement_frequencies;
                                }
                            }
                            return parameterMeasurementFrequencies;
                    }],
                    _parameterQCLevelList: ['$stateParams', 'StationParametersFactory', 
                        function($stateParams, StationParametersFactory) {
                            var stationId = $stateParams.station_id;
                            return StationParametersFactory.getParameterQCLevels(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _parameterQCLevels: ['_parameterQCLevelList', function(_parameterQCLevelList) {
                        var parameterQCLevels = {};
                        for (var i = 0; i < _parameterQCLevelList.length; i++) {
                            var parameterId = _parameterQCLevelList[i].parameter_id;
                            var parameterType = _parameterQCLevelList[i].parameter_type;
                            var parameterNotInObject = !(parameterId in parameterQCLevels);
                            if (parameterNotInObject) {
                                parameterQCLevels[parameterId] = {};
                            }
                            var parameterTypeNotInObject = !(parameterType in parameterQCLevels[parameterId]);
                            if (parameterTypeNotInObject) {
                                parameterQCLevels[parameterId][parameterType] = [];
                            }
                            parameterQCLevels[parameterId][parameterType].push(_parameterQCLevelList[i]);
                        }
                        return parameterQCLevels;
                    }],
                    _parameterSensorList: ['$stateParams', 'StationParametersFactory',
                        function($stateParams, StationParametersFactory) {
                            var stationId = $stateParams.station_id;
                            return StationParametersFactory.getParameterSensors(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _parameterSensors: ['_parameterSensorList', function(_parameterSensorList) {
                        var parameterSensors = {};
                        
                        for (var i = 0; i < _parameterSensorList.length; i++) {
                            var parameterId = _parameterSensorList[i].parameter_id;
                            var parameterType = _parameterSensorList[i].parameter_type;
                            var parameterNotInObject = !(parameterId in parameterSensors);
                            if (parameterNotInObject) {
                                parameterSensors[parameterId] = {};
                            }
                            var parameterTypeNotInObject = !(parameterType in parameterSensors[parameterId]);
                            if (parameterTypeNotInObject) {
                                parameterSensors[parameterId][parameterType] = {};
                            }
                            parameterSensors[parameterId][parameterType] = _parameterSensorList[i];
                        }

                        return parameterSensors;
                    }],
                    _profileParameterVerticalPositions: ['$q', '$stateParams', 'StationParametersFactory', '_parameterList', 
                        function($q, $stateParams, StationParametersFactory, _parameterList) {
                            
                            var stationId = $stateParams.station_id;
                            var profileVerticalPositions = {};
                            var promiseArray = [];
                            
                            for (var i = 0; i < _parameterList.length; i++) {
                                var parameterId = _parameterList[i].parameter_id;
                                var parameterType = _parameterList[i].parameter_type;
                                if (parameterType === 'profile') {
                                    var resource = StationParametersFactory.getProfileParameterVerticalPositions(stationId, parameterId);
                                    promiseArray.push(resource);
                                }
                                
                            }

                            return $q.all(promiseArray).then(function(response) {
                                for (var i = 0; i < response.length; i++) {
                                    for (var j = 0; j < response[i].data.length; j++) {
                                        var parameterId = response[i].data[j].parameter_id;
                                        var parameterNotInObject = !(parameterId in profileVerticalPositions);
                                        if (parameterNotInObject) {
                                            profileVerticalPositions[parameterId] = response[i].data;
                                        }
                                        
                                    }
                                }
                                return profileVerticalPositions;       
                            });
                        
                    }],
                    _parameters: ['_parameterList', '_parameterMeasurementFrequencies', '_parameterQCLevels', '_parameterSensors', '_profileParameterVerticalPositions',
                        function(_parameterList, _parameterMeasurementFrequencies, _parameterQCLevels, _parameterSensors, _profileParameterVerticalPositions) {
                            var parameters = {};
                            for (var i = 0; i < _parameterList.length; i++) {
                                var parameterId = _parameterList[i].parameter_id;
                                var parameterType = _parameterList[i].parameter_type;
                                
                                var parameterNotInParameters = !(parameterId in parameters);
                                if (parameterNotInParameters) {
                                    parameters[parameterId] = {};
                                }
                                
                                var parameterTypeNotInParameters = !(parameterType in parameters[parameterId]);
                                if (parameterTypeNotInParameters) {
                                    parameters[parameterId][parameterType] = {}
                                }
                                
                                parameters[parameterId][parameterType] = _parameterList[i];
                                
                                parameters[parameterId][parameterType]['frequencies'] = {
                                    'list': [],
                                    'selected': undefined
                                };

                                parameters[parameterId][parameterType]['qc_levels'] = {
                                    'list': [],
                                    'selected': [],
                                    'objects': {}
                                };
                                
                                parameters[parameterId][parameterType]['sensors'] = {};
                                
                                parameters[parameterId][parameterType]['vertical_positions'] = [];
                                
                                var parameterIdInMeasurementFrequencies = (parameterId in _parameterMeasurementFrequencies);

                                if (parameterIdInMeasurementFrequencies) {
                                    var parameterTypeInMeasurementFrequencies = (parameterType in _parameterMeasurementFrequencies[parameterId]);
                                    if (parameterTypeInMeasurementFrequencies) {
                                        parameters[parameterId][parameterType].frequencies.list = _parameterMeasurementFrequencies[parameterId][parameterType];
                                        parameters[parameterId][parameterType].frequencies.selected = 'Dynamic';
                                    }
                                }
                                
                                var parameterInQCLevels = (parameterId in _parameterQCLevels);
                                
                                if (parameterInQCLevels) {
                                    
                                    var parameterTypeInQCLevels = (parameterType in _parameterQCLevels[parameterId]);
                                    if (parameterTypeInQCLevels) {
                                        parameters[parameterId][parameterType].qc_levels.list = _parameterQCLevels[parameterId][parameterType];
                                        for (var j = 0; j < _parameterQCLevels[parameterId][parameterType].length; j++) {
                                            var qcLevel = _parameterQCLevels[parameterId][parameterType][j].qc_level;
                                            var noQCLevelSelected = !(parameters[parameterId][parameterType].qc_levels.selected.length);
                                            if (noQCLevelSelected) {
                                                parameters[parameterId][parameterType].qc_levels.selected.push(qcLevel);
                                            }
                                            
                                            parameters[parameterId][parameterType].qc_levels.objects[qcLevel] = {
                                                'qc_description': _parameterQCLevels[parameterId][parameterType][j].qc_description
                                            };
                                        }
                                    }
                                    
                                }
                                
                                var parameterInSensors = (parameterId in _parameterSensors);
                                if (parameterInSensors) {
                                    var parameterTypeInSensors = (parameterType in _parameterSensors[parameterId]);
                                    if (parameterTypeInSensors) {
                                        parameters[parameterId][parameterType].sensors = _parameterSensors[parameterId][parameterType];
                                    }
                                }
                                
                                if (parameterType === 'profile') {
                                    var parameterInProfileVerticalPositions = (parameterId in _profileParameterVerticalPositions);
                                    if (parameterInProfileVerticalPositions) {
                                        parameters[parameterId][parameterType]['vertical_positions'] = _profileParameterVerticalPositions[parameterId];
                                    }
                                }
                                
                            }
    
                        return parameters;
                    }]
                }
                    
            })
            .state('station.cams-and-photos', {
                url: '/cams-and-photos',
                templateUrl: '/static/partials/station/station-cams-and-photos.html',
                abstract: true,
                controller: 'StationCamsAndPhotosCtrl',
                controllerAs: 'stationCamsAndPhotosVm',
                resolve: {
                }
                
            })
            .state('station.cams-and-photos.livewebcams', {
                url: '/livewebcams',
                templateUrl: '/static/partials/station/station-cams-and-photos-livewebcams.html',
                controller: 'StationCamsAndPhotosLiveWebcamsCtrl',
                controllerAs: 'stationCamsAndPhotosLiveWebcamsCtrlVm',
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
            .state('station.cams-and-photos.videos', {
                url: '/videos',
                templateUrl: '/static/partials/station/station-cams-and-photos-videos.html',
                controller: 'StationCamsAndPhotosVideosCtrl',
                controllerAs: 'stationCamsAndPhotosVideosCtrlVm',
                resolve: {
                }
                
            })
            .state('station.cams-and-photos.photos', {
                url: '/photos',
                templateUrl: '/static/partials/station/station-cams-and-photos-photos.html',
                controller: 'StationCamsAndPhotosPhotosCtrl',
                controllerAs: 'stationCamsAndPhotosPhotosCtrlVm',
                resolve: {
                }
                
            })
        
    }
    
})();
