(function() {
    'use strict';
    
    angular
        .module('app.station')
        .directive('stationDataGroup', stationDataGroup);

    function stationDataGroup() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'static/partials/station/station-data-group.directive.html',
            scope: {
                station: '=',
                group: '='
            },
            controller: StationDataGroupItemCtrl,
            controllerAs: 'stationDataGroupItemVm',
            bindToController: true
        };

        return directive;
    }
    
    StationDataGroupItemCtrl.$inject = [
        '$scope', '$mdMedia', '$q', 'HighchartsDefaultOptions', 'stationGroupMeasurements'
    ];
    
    function StationDataGroupItemCtrl($scope, $mdMedia, $q, HighchartsDefaultOptions, stationGroupMeasurements) {
        var vm = this;
        
        vm.$onInit = onInit;
        vm.frequencyChange = frequencyChange;
        vm.getHeader = getHeader;
        vm.prepareCSVExport = prepareCSVExport;
        vm.qcLevelChange = qcLevelChange;
        vm.tableOptionsAll = [];
        vm.viewChart = true;
        vm.viewTable = false;
        vm.changeDataView = changeDataView;
        
        var chart;
        
        function changeDataView() {
            vm.viewChart = !vm.viewChart;
            vm.viewTable = !vm.viewTable;
        }
        
        function initDynamicTableOptions(qcData) {
            var firstRow = qcData[0];
            var dataQcLevel = firstRow.qc_level;
            var label = 'Timestamp';
            var order = 'timestamp';
            var dateFormat = 'yyyy-MM-dd HH:mm:ss';
            var momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
            var header = initTableHeader();
            if ('date' in firstRow) {
                order = 'date';
                label = 'Date';
                dateFormat = 'yyyy-MM-dd';
                momentDateFormat = 'YYYY-MM-DD';
            }
            else if ('date_hour' in firstRow) {
                order = 'date_hour';
                label = 'Date & Hour';
                dateFormat = 'yyyy-MM-dd HH:mm';
                momentDateFormat = 'YYYY-MM-DD HH:mm';
            }
            
            var tableOptions = {
                'name': vm.group.group_name + ' - QC Level ' + dataQcLevel,
                'options': {
                    'decapitate': false,
                    'boundaryLinks': false,
                    'limitSelect': true,
                    'pageSelect': true
                },
                'query': {
                    'label': label,
                    'order': order,
                    'dateFormat': dateFormat,
                    'momentDateFormat': momentDateFormat,
                    'limit': 5,
                    'page': 1
                },
                'count': qcData.length,
                'header': header,
                'data': qcData,
                'isReady': true
            };
            
            return tableOptions;
        }
        
        function initDateTableOptions(qcData) {
            var firstRow = qcData[0];
            var dataQcLevel = firstRow.qc_level;
            var header = initTableHeader();
            
            var tableOptions = {
                'name': vm.group.group_name + ' - QC Level ' + dataQcLevel,
                'options': {
                    'decapitate': false,
                    'boundaryLinks': false,
                    'limitSelect': true,
                    'pageSelect': true
                },
                'query': {
                    'label': 'Date',
                    'order': 'date',
                    'dateFormat': 'yyyy-MM-dd',
                    'momentDateFormat': 'YYYY-MM-DD',
                    'limit': 5,
                    'page': 1
                },
                'count': qcData.length,
                'header': header,
                'data': qcData,
                'isReady': true
            };
            
            return tableOptions;
        }
        
        function initDateHourTableOptions(qcData) {
            var firstRow = qcData[0];
            var dataQcLevel = firstRow.qc_level;
            var header = initTableHeader();
            
            var tableOptions = {
                'name': vm.group.group_name + ' - QC Level ' + dataQcLevel,
                'options': {
                    'decapitate': false,
                    'boundaryLinks': false,
                    'limitSelect': true,
                    'pageSelect': true
                },
                'query': {
                    'label': 'Date & Hour',
                    'order': 'date_hour',
                    'dateFormat': 'yyyy-MM-dd HH:mm',
                    'momentDateFormat': 'YYYY-MM-DD HH:mm',
                    'limit': 5,
                    'page': 1
                },
                'count': qcData.length,
                'header': header,
                'data': qcData,
                'isReady': true
            };
            
            return tableOptions;
        }
        
        function initTimestampTableOptions(qcData) {
            var firstRow = qcData[0];
            var dataQcLevel = firstRow.qc_level;
            var header = initTableHeader();
            
            var tableOptions = {
                'name': vm.group.group_name + ' - QC Level ' + dataQcLevel,
                'options': {
                    'decapitate': false,
                    'boundaryLinks': false,
                    'limitSelect': true,
                    'pageSelect': true
                },
                'query': {
                    'label': 'Timestamp',
                    'order': 'timestamp',
                    'dateFormat': 'yyyy-MM-dd HH:mm:ss',
                    'momentDateFormat': 'YYYY-MM-DD HH:mm:ss',
                    'limit': 5,
                    'page': 1
                },
                'count': qcData.length,
                'header': header,
                'data': qcData,
                'isReady': true
            };
            
            return tableOptions;
        }
        
        function updateChart(data) {
            for (var i = 0; i < vm.group.parameters.list.length; i++) {
                var parameterId = vm.group.parameters.list[i].parameter_id;
                for (var j = 0; j < vm.group.qc_levels.selected.length; j++) {
                    var qcLevel = vm.group.qc_levels.selected[j];
                    var averageSeriesId = parameterId + '-' + qcLevel;
                    var rangeSeriesId = parameterId + '-' + qcLevel + '-ranges';
                    var averageSeries = chart.get(averageSeriesId);
                    var rangeSeries = chart.get(rangeSeriesId);
                    
                    var qcLevelDataFound = false;
                    for (var k = 0; k < data.length; k++) {
                        if (parameterId in data[k]) {
                            var dataQcLevel = data[k][parameterId].qc_level;
                            if (qcLevel == dataQcLevel) {
                                qcLevelDataFound = true;
                                averageSeries.setData(data[k][parameterId].averages);
                                rangeSeries.setData(data[k][parameterId].ranges);
                            }
                        }
                    }
                    
                    if (!qcLevelDataFound) {
                        averageSeries.setData([], false);
                        rangeSeries.setData([], false);
                    }
                }
                
                
            }
            chart.hideLoading();
            chart.redraw();
        }
        
        function afterSetExtremes(e) {
            if (e.trigger != undefined) {
                var min = Math.round(e.min);
                var max = Math.round(e.max);
                chart.showLoading('Loading data from server...');
                
                if (vm.group.frequencies.selected === 'Dynamic') {
                    
                    getDynamicChartData(min, max).then(function(data) {
                        updateChart(data);
                    });
                    
                    vm.tableOptionsAll = [];
                    
                    getDynamicTableData(min, max).then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(qcData) || qcData.length) {
                                var tableOptions = initDynamicTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                    });

                }
                
                else if (vm.group.frequencies.selected === 'Daily') {
                    
                    getDailyChartData(min, max).then(function(data) {
                        updateChart(data);
                    });
                    
                    vm.tableOptionsAll = [];
                    
                    getDailyTableData(min, max).then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(qcData) || qcData.length) {
                                var tableOptions = initDateTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                    });

                }
                
                else if (vm.group.frequencies.selected === 'Hourly') {
                    
                    getHourlyChartData(min, max).then(function(data) {
                        updateChart(data);
                    });
                    
                    vm.tableOptionsAll = [];
                    
                    getHourlyTableData(min, max).then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(qcData) || qcData.length) {
                                var tableOptions = initDateHourTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                    });
                    
                }
                
                else if (vm.group.frequencies.selected === '30 Min') {
                    
                    getThirtyMinChartData(min, max).then(function(data) {
                        updateChart(data);
                    });
                    
                    vm.tableOptionsAll = [];
                    
                    getThirtyMinTableData(min, max).then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(qcData) || qcData.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                    });
                    
                }
                
                else if (vm.group.frequencies.selected === '20 Min') {
                    
                    getTwentyMinChartData(min, max).then(function(data) {
                        updateChart(data);
                    });
                    
                    vm.tableOptionsAll = [];
                    
                    getTwentyMinTableData(min, max).then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(qcData) || qcData.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                    });
                    
                }
                
                else if (vm.group.frequencies.selected === '15 Min') {
                    
                    getFifteenMinChartData(min, max).then(function(data) {
                        updateChart(data);
                    });
                    
                    vm.tableOptionsAll = [];
                    
                    getFifteenMinTableData(min, max).then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(qcData) || qcData.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                    });
                    
                }
                
                else if (vm.group.frequencies.selected === '10 Min') {
                    
                    getTenMinChartData(min, max).then(function(data) {
                        updateChart(data);
                    });
                    
                    vm.tableOptionsAll = [];
                    
                    getTenMinTableData(min, max).then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(qcData) || qcData.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                    });
                    
                }
                
                else if (vm.group.frequencies.selected === '5 Min') {
                    
                    getFiveMinChartData(min, max).then(function(data) {
                        updateChart(data);
                    });
                    
                    vm.tableOptionsAll = [];
                    
                    getFiveMinTableData(min, max).then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(qcData) || qcData.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                    });
                    
                }
                
                else if (vm.group.frequencies.selected === '1 Min') {
                    
                    getOneMinChartData(min, max).then(function(data) {
                        updateChart(data);
                    });
                    
                    vm.tableOptionsAll = [];
                    
                    getOneMinTableData(min, max).then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(qcData) || qcData.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                    });
                    
                }
                
                else if (vm.group.frequencies.selected === '1 Sec') {
                    
                    getOneSecChartData(min, max).then(function(data) {
                        updateChart(data);
                    });
                    
                    vm.tableOptionsAll = [];
                    
                    getOneSecTableData(min, max).then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(qcData) || qcData.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                    });
                    
                }
                
            }
        }
        
        function frequencyChange() {
            initChart();
            initTable();
        }
        
        function qcLevelChange() {
            initChart();
            initTable();
        }
        
        // Dynamic
        
        function getDynamicChartDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getDynamicGroupMeasurementsChart(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getDynamicChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getDynamicChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })

        }
        
        function getDynamicTableDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getDynamicGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getDynamicTableData(start, end) {
            var promiseArray = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getDynamicTableDataByQCLevel(qcLevel, start, end)
                promiseArray.push(resource);
            }
            return $q.all(promiseArray).then(function(data) {
                return data;
            })
        }
        
        // Daily
        
        function getDailyChartDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getDailyGroupMeasurementsChart(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getDailyChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getDailyChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getDailyTableDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getDailyGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getDailyTableData(start, end) {
            var promiseArray = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getDailyTableDataByQCLevel(qcLevel, start, end)
                promiseArray.push(resource);
            }
            return $q.all(promiseArray).then(function(data) {
                return data;
            })
        }
        
        // Hourly
        
        function getHourlyChartDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getHourlyGroupMeasurementsChart(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyChartData(start, end) {
            var promiseArray = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getHourlyChartDataByQCLevel(qcLevel, start, end)
                promiseArray.push(resource);
            }
            return $q.all(promiseArray).then(function(data) {
                return data;
            })
        }
        
        function getHourlyTableDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getHourlyGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyTableData(start, end) {
            var promiseArray = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getHourlyTableDataByQCLevel(qcLevel, start, end)
                promiseArray.push(resource);
            }
            return $q.all(promiseArray).then(function(data) {
                return data;
            })
        }
        
        // 30 Min
        
        function getThirtyMinChartDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getThirtyMinGroupMeasurementsChart(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getThirtyMinChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getThirtyMinChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getThirtyMinTableDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getThirtyMinGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getThirtyMinTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getThirtyMinTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        // 20 Min
        
        function getTwentyMinChartDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getTwentyMinGroupMeasurementsChart(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTwentyMinChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getTwentyMinChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getTwentyMinTableDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getTwentyMinGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTwentyMinTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getTwentyMinTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        // 15 Min
        
        function getFifteenMinChartDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getFifteenMinGroupMeasurementsChart(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getFifteenMinChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getFifteenMinChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getFifteenMinTableDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getFifteenMinGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getFifteenMinTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getFifteenMinTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        // 10 Min
        
        function getTenMinChartDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getTenMinGroupMeasurementsChart(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTenMinChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getTenMinChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getTenMinTableDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getTenMinGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTenMinTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getTenMinTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        // 5 Min
        
        function getFiveMinChartDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getFiveMinGroupMeasurementsChart(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getFiveMinChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getFiveMinChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getFiveMinTableDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getFiveMinGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getFiveMinTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getFiveMinTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        // 1 Min
        
        function getOneMinChartDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getOneMinGroupMeasurementsChart(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getOneMinChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getOneMinChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getOneMinTableDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getOneMinGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getOneMinTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getOneMinTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        // 1 Second
        
        function getOneSecChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getOneSecChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getOneSecChartDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getOneSecGroupMeasurementsChart(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        
        function getOneSecTableDataByQCLevel(qcLevel, start, end) {
            return stationGroupMeasurements.getOneSecGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getOneSecTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.group.qc_levels.selected.length; i++) {
                var qcLevel = vm.group.qc_levels.selected[i];
                var resource = getOneSecTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getHeader(tableIndex) {
            var header = [];
            var timeLabel = vm.tableOptionsAll[tableIndex].query.label + ' (Local Time)';
            header.push(timeLabel);
            
            for (var i = 0; i < vm.tableOptionsAll[tableIndex].header.length; i++) {
                header.push(vm.tableOptionsAll[tableIndex].header[i].header);
            }
            
            return header;
            
        }
        
        function prepareCSVExport(tableIndex) {
            var data = [];
            var tableToExport = vm.tableOptionsAll[tableIndex];
            var timeFormat = tableToExport.query.order;
            var timeLabel = tableToExport.query.label;
            for (var i = 0; i < tableToExport.count; i++) {
                var timestamp = tableToExport.data[i][timeFormat];
                var date = moment(timestamp).format(tableToExport.query.momentDateFormat);
                var row = {timeLabel: date}
                for (var j = 0; j < tableToExport.header.length; j++) {
                    var parameterId = tableToExport.header[j].parameterId;
                    var headerName = tableToExport.header[j].header;
                    var valueType = tableToExport.header[j].valueType;
                    if (parameterId in tableToExport.data[i].data) {
                        var measurement = tableToExport.data[i].data[parameterId][valueType]
                        row[headerName] = measurement;
                    }
                }
                
                data.push(row);
            }
            
            return data;
        }
        
        function initChart() {
            var chartId = 'chart-' + vm.group.group_id;
            var yAxis = inityAxis();
            
            if (vm.group.frequencies.selected === 'Dynamic') {
                getDynamicChartData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        var seriesOptions = initSeriesOptions(data);
                        chart = new Highcharts.stockChart({
                    
                            chart: {
                                renderTo: chartId,
                                style: {
                                    fontFamily: 'Roboto'
                                },
                                type: 'spline'
                            },

                            credits: {
                                enabled: false
                            },
                            
                            lang: {
                                noData: 'No data to display'
                            },
                          
                            legend: {
                                enabled: true,
                                margin: 30,
                                layout: 'horizontal',
                                verticalAlign: 'bottom',
                                maxHeight: 100,
                                navigation: {
                                    activeColor: '#3E576F',
                                    animation: true,
                                    arrowSize: 12,
                                    inactiveColor: '#CCC',
                                    style: {
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }
                                }
                            },
                          
                            rangeSelector: {
                                buttons: [{
                                    type: 'minute',
                                    count: 1,
                                    text: '1M'
                                }, {
                                    type: 'hour',
                                    count: 1,
                                    text: '1h'
                                }, {
                                    type: 'day',
                                    count: 1,
                                    text: '1d'
                                }, { 
                                    type: 'month',
                                    count: 1,
                                    text: '1m'
                                }, {
                                    type: 'year',
                                    count: 1,
                                    text: '1y'
                                }, {
                                    type: 'all',
                                    text: 'All'
                                }],
                                inputBoxWidth: 130,
                                inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                inputDateParser: function (value) {
                                    var temp_date;
                                    if (HighchartsDefaultOptions.global.useUTC) {
                                        temp_date = moment.utc(value);
                                    }
                                    else {
                                        temp_date = moment(value);
                                    }
                                    return temp_date.valueOf();
                                },
                                inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                selected: 4,
                            },

                            navigator: {
                                adaptToUpdatedData: false
                            },

                            series: seriesOptions,
                            
                            title: {
                                text: vm.group.group_name + ' at ' + vm.station.name
                            },

                            noData: {
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    color: '#303030'
                                }
                            },

                            scrollbar: {
                                liveRedraw: false 
                            },

                            xAxis: [{
                                type: 'datetime',
                                minRange: 60000,    // 1 min
                                events: {
                                    afterSetExtremes: afterSetExtremes
                                }
                            }],

                            yAxis: yAxis,
                        
                        });

                    });
            }
            
            else if (vm.group.frequencies.selected === 'Daily') {
                getDailyChartData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        var seriesOptions = initSeriesOptions(data);
                        chart = new Highcharts.stockChart({
                    
                            chart: {
                                renderTo: chartId,
                                style: {
                                    fontFamily: 'Roboto'
                                },
                                type: 'spline'
                            },

                            credits: {
                                enabled: false
                            },

                            lang: {
                                noData: 'No data to display'
                            },
                          
                            legend: {
                                enabled: true,
                                margin: 30,
                                layout: 'horizontal',
                                verticalAlign: 'bottom',
                                maxHeight: 100,
                                navigation: {
                                    activeColor: '#3E576F',
                                    animation: true,
                                    arrowSize: 12,
                                    inactiveColor: '#CCC',
                                    style: {
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }
                                }
                            },
                          
                            rangeSelector: {
                                buttons: [{
                                    type: 'day',
                                    count: 3,
                                    text: '3d'
                                }, {
                                    type: 'week',
                                    count: 1,
                                    text: '1w'
                                }, {
                                    type: 'month',
                                    count: 1,
                                    text: '1m'
                                }, {
                                    type: 'month',
                                    count: 3,
                                    text: '3m'
                                }, {
                                    type: 'month',
                                    count: 6,
                                    text: '6m'
                                }, {
                                    type: 'year',
                                    count: 1,
                                    text: '1y'
                                }, {
                                    type: 'all',
                                    text: 'All'
                                }],
                                inputDateFormat: "%Y-%m-%d",
                                inputEditDateFormat: "%Y-%m-%d",
                                inputDateParser: function (value) {
                                    var temp_date;
                                    if (HighchartsDefaultOptions.global.useUTC) {
                                        temp_date = moment.utc(value);
                                    }
                                    else {
                                        temp_date = moment(value);
                                    }
                                    return temp_date.valueOf();
                                },
                                selected: 4,
                            },

                            navigator: {
                                adaptToUpdatedData: false
                            },

                            series: seriesOptions,
                        
                            title: {
                                text: vm.group.group_name + ' at ' + vm.station.name
                            },

                            noData: {
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    color: '#303030'
                                }
                            },

                            scrollbar: {
                                liveRedraw: false 
                            },

                            xAxis: [{
                                type: 'datetime',
                                minRange: 3600 * 1000 * 24 * 3,
                                events: {
                                    afterSetExtremes: afterSetExtremes
                                }
                            }],

                            yAxis: yAxis,
                    
                        });

                  });
            }
            
            else if (vm.group.frequencies.selected === 'Hourly') {
                getHourlyChartData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        var seriesOptions = initSeriesOptions(data);
                        chart = new Highcharts.stockChart({
                    
                            chart: {
                                renderTo: chartId,
                                style: {
                                    fontFamily: 'Roboto'
                                },
                                type: 'spline'
                            },

                            credits: {
                                enabled: false
                            },

                            lang: {
                                noData: 'No data to display'
                            },
                          
                            legend: {
                                enabled: true,
                                margin: 30,
                                layout: 'horizontal',
                                verticalAlign: 'bottom',
                                maxHeight: 100,
                                navigation: {
                                    activeColor: '#3E576F',
                                    animation: true,
                                    arrowSize: 12,
                                    inactiveColor: '#CCC',
                                    style: {
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }
                                }
                            },
                          
                            rangeSelector: {
                                buttons: [{
                                    type: 'day',
                                    count: 1,
                                    text: '1d'
                                }, {
                                    type: 'day',
                                    count: 3,
                                    text: '3d'
                                }, {
                                    type: 'week',
                                    count: 1,
                                    text: '1w'
                                }, {
                                    type: 'month',
                                    count: 1,
                                    text: '1m'
                                }, {
                                    type: 'month',
                                    count: 3,
                                    text: '3m'
                                }, {
                                    type: 'month',
                                    count: 6,
                                    text: '6m'
                                }, {
                                    type: 'year',
                                    count: 1,
                                    text: '1y'
                                }, {
                                    type: 'all',
                                    text: 'All'
                                }],
                                selected: 4,
                                inputBoxWidth: 130,
                                inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                inputEditDateFormat: "%Y-%m-%d %H:%M:%S"
                            },

                            navigator: {
                                adaptToUpdatedData: false
                            },

                            series: seriesOptions,
                        
                            title: {
                                text: vm.group.group_name + ' at ' + vm.station.name
                            },

                            noData: {
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    color: '#303030'
                                }
                            },

                            scrollbar: {
                                liveRedraw: false 
                            },

                            xAxis: [{
                                type: 'datetime',
                                minRange: 3600 * 1000 * 24,
                                events: {
                                    afterSetExtremes: afterSetExtremes
                                }
                            }],

                            yAxis: yAxis,
                    
                        });

                    });
            }
            
            else if (vm.group.frequencies.selected === '30 Min') {
                getThirtyMinChartData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        var seriesOptions = initSeriesOptions(data);
                        chart = new Highcharts.stockChart({
                    
                            chart: {
                                renderTo: chartId,
                                style: {
                                    fontFamily: 'Roboto'
                                },
                                type: 'spline'
                            },

                            credits: {
                                enabled: false
                            },

                            lang: {
                                noData: 'No data to display'
                            },
                          
                            legend: {
                                enabled: true,
                                margin: 30,
                                layout: 'horizontal',
                                verticalAlign: 'bottom',
                                maxHeight: 100,
                                navigation: {
                                    activeColor: '#3E576F',
                                    animation: true,
                                    arrowSize: 12,
                                    inactiveColor: '#CCC',
                                    style: {
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }
                                }
                            },
                          
                            rangeSelector: {
                                buttons: [{
                                    type: 'day',
                                    count: 1,
                                    text: '1d'
                                }, {
                                    type: 'day',
                                    count: 3,
                                    text: '3d'
                                }, {
                                    type: 'week',
                                    count: 1,
                                    text: '1w'
                                }, {
                                    type: 'month',
                                    count: 1,
                                    text: '1m'
                                }, {
                                    type: 'month',
                                    count: 3,
                                    text: '3m'
                                }, {
                                    type: 'month',
                                    count: 6,
                                    text: '6m'
                                }, {
                                    type: 'year',
                                    count: 1,
                                    text: '1y'
                                }, {
                                    type: 'all',
                                    text: 'All'
                                }],
                                selected: 4,
                                inputBoxWidth: 130,
                                inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                inputEditDateFormat: "%Y-%m-%d %H:%M:%S"
                            },

                            navigator: {
                                adaptToUpdatedData: false
                            },

                            series: seriesOptions,
                        
                            title: {
                                text: vm.group.group_name + ' at ' + vm.station.name
                            },

                            noData: {
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    color: '#303030'
                                }
                            },

                            scrollbar: {
                                liveRedraw: false 
                            },

                            xAxis: [{
                                type: 'datetime',
                                minRange: 3600 * 1000 * 24,
                                events: {
                                    afterSetExtremes: afterSetExtremes
                                }
                            }],

                            yAxis: yAxis,
                    
                        });

                    });
            }
            
            else if (vm.group.frequencies.selected === '20 Min') {
                getTwentyMinChartData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        var seriesOptions = initSeriesOptions(data);
                        chart = new Highcharts.stockChart({
                    
                            chart: {
                                renderTo: chartId,
                                style: {
                                    fontFamily: 'Roboto'
                                },
                                type: 'spline'
                            },

                            credits: {
                                enabled: false
                            },

                            lang: {
                                noData: 'No data to display'
                            },
                          
                            legend: {
                                enabled: true,
                                margin: 30,
                                layout: 'horizontal',
                                verticalAlign: 'bottom',
                                maxHeight: 100,
                                navigation: {
                                    activeColor: '#3E576F',
                                    animation: true,
                                    arrowSize: 12,
                                    inactiveColor: '#CCC',
                                    style: {
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }
                                }
                            },
                          
                            rangeSelector: {
                                buttons: [{
                                    type: 'day',
                                    count: 1,
                                    text: '1d'
                                }, {
                                    type: 'day',
                                    count: 3,
                                    text: '3d'
                                }, {
                                    type: 'week',
                                    count: 1,
                                    text: '1w'
                                }, {
                                    type: 'month',
                                    count: 1,
                                    text: '1m'
                                }, {
                                    type: 'month',
                                    count: 3,
                                    text: '3m'
                                }, {
                                    type: 'month',
                                    count: 6,
                                    text: '6m'
                                }, {
                                    type: 'year',
                                    count: 1,
                                    text: '1y'
                                }, {
                                    type: 'all',
                                    text: 'All'
                                }],
                                selected: 4,
                                inputBoxWidth: 130,
                                inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                inputEditDateFormat: "%Y-%m-%d %H:%M:%S"
                            },

                            navigator: {
                                adaptToUpdatedData: false
                            },

                            series: seriesOptions,
                        
                            title: {
                                text: vm.group.group_name + ' at ' + vm.station.name
                            },

                            noData: {
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    color: '#303030'
                                }
                            },

                            scrollbar: {
                                liveRedraw: false 
                            },

                            xAxis: [{
                                type: 'datetime',
                                minRange: 3600 * 1000 * 24,
                                events: {
                                    afterSetExtremes: afterSetExtremes
                                }
                            }],

                            yAxis: yAxis,
                    
                        });

                    });
            }
            
            else if (vm.group.frequencies.selected === '15 Min') {
                getFifteenMinChartData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        var seriesOptions = initSeriesOptions(data);
                        chart = new Highcharts.stockChart({
                    
                            chart: {
                                renderTo: chartId,
                                style: {
                                    fontFamily: 'Roboto'
                                },
                                type: 'spline'
                            },

                            credits: {
                                enabled: false
                            },

                            lang: {
                                noData: 'No data to display'
                            },
                          
                            legend: {
                                enabled: true,
                                margin: 30,
                                layout: 'horizontal',
                                verticalAlign: 'bottom',
                                maxHeight: 100,
                                navigation: {
                                    activeColor: '#3E576F',
                                    animation: true,
                                    arrowSize: 12,
                                    inactiveColor: '#CCC',
                                    style: {
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }
                                }
                            },
                            
                            rangeSelector: {
                                buttons: [{
                                    type: 'day',
                                    count: 1,
                                    text: '1d'
                                }, {
                                    type: 'day',
                                    count: 3,
                                    text: '3d'
                                }, {
                                    type: 'week',
                                    count: 1,
                                    text: '1w'
                                }, {
                                    type: 'month',
                                    count: 1,
                                    text: '1m'
                                }, {
                                    type: 'month',
                                    count: 3,
                                    text: '3m'
                                }, {
                                    type: 'month',
                                    count: 6,
                                    text: '6m'
                                }, {
                                    type: 'year',
                                    count: 1,
                                    text: '1y'
                                }, {
                                    type: 'all',
                                    text: 'All'
                                }],
                                selected: 4,
                                inputBoxWidth: 130,
                                inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                inputEditDateFormat: "%Y-%m-%d %H:%M:%S"
                            },

                            navigator: {
                                adaptToUpdatedData: false
                            },

                            series: seriesOptions,
                        
                            title: {
                                text: vm.group.group_name + ' at ' + vm.station.name
                            },

                            noData: {
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    color: '#303030'
                                }
                            },

                            scrollbar: {
                                liveRedraw: false 
                            },

                            xAxis: [{
                                type: 'datetime',
                                minRange: 3600 * 1000 * 24,
                                events: {
                                    afterSetExtremes: afterSetExtremes
                                }
                            }],

                            yAxis: yAxis,
                    
                        });

                    });
            }
            
            else if (vm.group.frequencies.selected === '10 Min') {
                getTenMinChartData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        var seriesOptions = initSeriesOptions(data);
                        chart = new Highcharts.stockChart({
                    
                            chart: {
                                renderTo: chartId,
                                style: {
                                    fontFamily: 'Roboto'
                                },
                                type: 'spline'
                            },

                            credits: {
                                enabled: false
                            },

                            lang: {
                                noData: 'No data to display'
                            },
                          
                            legend: {
                                enabled: true,
                                margin: 30,
                                layout: 'horizontal',
                                verticalAlign: 'bottom',
                                maxHeight: 100,
                                navigation: {
                                    activeColor: '#3E576F',
                                    animation: true,
                                    arrowSize: 12,
                                    inactiveColor: '#CCC',
                                    style: {
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }
                                }
                            },
                          
                            rangeSelector: {
                                buttons: [{
                                    type: 'hour',
                                    count: 1,
                                    text: '1h'
                                }, {
                                    type: 'hour',
                                    count: 12,
                                    text: '12h'
                                }, {
                                    type: 'day',
                                    count: 1,
                                    text: '1d'
                                }, {
                                    type: 'day',
                                    count: 3,
                                    text: '3d'
                                }, {
                                    type: 'week',
                                    count: 1,
                                    text: '1w'
                                }, {
                                    type: 'month',
                                    count: 1,
                                    text: '1m'
                                }, {
                                    type: 'month',
                                    count: 3,
                                    text: '3m'
                                }, {
                                    type: 'month',
                                    count: 6,
                                    text: '6m'
                                }, {
                                    type: 'year',
                                    count: 1,
                                    text: '1y'
                                }, {
                                    type: 'all',
                                    text: 'All'
                                }],
                                selected: 4,
                                inputBoxWidth: 130,
                                inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                inputEditDateFormat: "%Y-%m-%d %H:%M:%S"
                            },

                            navigator: {
                                adaptToUpdatedData: false
                            },

                            series: seriesOptions,
                        
                            title: {
                                text: vm.group.group_name + ' at ' + vm.station.name
                            },

                            noData: {
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    color: '#303030'
                                }
                            },

                            scrollbar: {
                                liveRedraw: false 
                            },

                            xAxis: [{
                                type: 'datetime',
                                minRange: 3600 * 1000,
                                events: {
                                    afterSetExtremes: afterSetExtremes
                                }
                            }],

                            yAxis: yAxis,
                    
                        });

                    });
            }
            
            else if (vm.group.frequencies.selected === '5 Min') {
                getFiveMinChartData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        var seriesOptions = initSeriesOptions(data);
                        chart = new Highcharts.stockChart({
                    
                            chart: {
                                renderTo: chartId,
                                style: {
                                    fontFamily: 'Roboto'
                                },
                                type: 'spline'
                            },

                            credits: {
                                enabled: false
                            },

                            lang: {
                                noData: 'No data to display'
                            },
                          
                            legend: {
                                enabled: true,
                                margin: 30,
                                layout: 'horizontal',
                                verticalAlign: 'bottom',
                                maxHeight: 100,
                                navigation: {
                                    activeColor: '#3E576F',
                                    animation: true,
                                    arrowSize: 12,
                                    inactiveColor: '#CCC',
                                    style: {
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }
                                }
                            },
                          
                            rangeSelector: {
                                buttons: [{
                                    type: 'hour',
                                    count: 1,
                                    text: '1h'
                                }, {
                                    type: 'day',
                                    count: 1,
                                    text: '1d'
                                }, {
                                    type: 'day',
                                    count: 3,
                                    text: '3d'
                                }, {
                                    type: 'week',
                                    count: 1,
                                    text: '1w'
                                }, {
                                    type: 'month',
                                    count: 1,
                                    text: '1m'
                                }, {
                                    type: 'month',
                                    count: 3,
                                    text: '3m'
                                }, {
                                    type: 'month',
                                    count: 6,
                                    text: '6m'
                                }, {
                                    type: 'year',
                                    count: 1,
                                    text: '1y'
                                }, {
                                    type: 'all',
                                    text: 'All'
                                }],
                                selected: 4,
                                inputBoxWidth: 130,
                                inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                inputEditDateFormat: "%Y-%m-%d %H:%M:%S"
                            },

                            navigator: {
                                adaptToUpdatedData: false
                            },

                            series: seriesOptions,
                        
                            title: {
                                text: vm.group.group_name + ' at ' + vm.station.name
                            },

                            noData: {
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    color: '#303030'
                                }
                            },

                            scrollbar: {
                                liveRedraw: false 
                            },

                            xAxis: [{
                                type: 'datetime',
                                minRange: 3600 * 1000,
                                events: {
                                    afterSetExtremes: afterSetExtremes
                                }
                            }],

                            yAxis: yAxis,
                    
                        });

                  });
              }
              
              else if (vm.group.frequencies.selected === '1 Min') {
                getOneMinChartData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        var seriesOptions = initSeriesOptions(data);
                        chart = new Highcharts.stockChart({
                    
                            chart: {
                                renderTo: chartId,
                                style: {
                                    fontFamily: 'Roboto'
                                },
                                type: 'spline'
                            },

                            credits: {
                                enabled: false
                            },

                            lang: {
                                noData: 'No data to display'
                            },
                          
                            legend: {
                                enabled: true,
                                margin: 30,
                                layout: 'horizontal',
                                verticalAlign: 'bottom',
                                maxHeight: 100,
                                navigation: {
                                    activeColor: '#3E576F',
                                    animation: true,
                                    arrowSize: 12,
                                    inactiveColor: '#CCC',
                                    style: {
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }
                                }
                            },
                          
                            rangeSelector: {
                                buttons: [{
                                    type: 'hour',
                                    count: 1,
                                    text: '1h'
                                }, {
                                    type: 'day',
                                    count: 1,
                                    text: '1d'
                                }, {
                                    type: 'day',
                                    count: 3,
                                    text: '3d'
                                }, {
                                    type: 'week',
                                    count: 1,
                                    text: '1w'
                                }, {
                                    type: 'month',
                                    count: 1,
                                    text: '1m'
                                }, {
                                    type: 'month',
                                    count: 3,
                                    text: '3m'
                                }, {
                                    type: 'month',
                                    count: 6,
                                    text: '6m'
                                }, {
                                    type: 'year',
                                    count: 1,
                                    text: '1y'
                                }, {
                                    type: 'all',
                                    text: 'All'
                                }],
                                selected: 4,
                                inputBoxWidth: 130,
                                inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                inputEditDateFormat: "%Y-%m-%d %H:%M:%S"
                            },

                            navigator: {
                                adaptToUpdatedData: false
                            },

                            series: seriesOptions,
                        
                            title: {
                                text: vm.group.group_name + ' at ' + vm.station.name
                            },

                            noData: {
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    color: '#303030'
                                }
                            },

                            scrollbar: {
                                liveRedraw: false 
                            },

                            xAxis: [{
                                type: 'datetime',
                                minRange: 3600 * 1000,
                                events: {
                                    afterSetExtremes: afterSetExtremes
                                }
                            }],

                            yAxis: yAxis,
                    
                        });

                  });
              }
              
              else if (vm.group.frequencies.selected === '1 Sec') {
                getOneSecChartData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        var seriesOptions = initSeriesOptions(data);
                        chart = new Highcharts.stockChart({
                    
                            chart: {
                                renderTo: chartId,
                                style: {
                                    fontFamily: 'Roboto'
                                },
                                type: 'spline'
                            },

                            credits: {
                                enabled: false
                            },

                            lang: {
                                noData: 'No data to display'
                            },
                          
                            legend: {
                                enabled: true,
                                margin: 30,
                                layout: 'horizontal',
                                verticalAlign: 'bottom',
                                maxHeight: 100,
                                navigation: {
                                    activeColor: '#3E576F',
                                    animation: true,
                                    arrowSize: 12,
                                    inactiveColor: '#CCC',
                                    style: {
                                        fontWeight: 'bold',
                                        color: '#333'
                                    }
                                }
                            },
                          
                            rangeSelector: {
                                buttons: [{
                                    type: 'minute',
                                    count: 1,
                                    text: '1M'
                                }, {
                                    type: 'minute',
                                    count: 5,
                                    text: '5M'
                                }, {
                                    type: 'hour',
                                    count: 1,
                                    text: '1h'
                                }, {
                                    type: 'day',
                                    count: 1,
                                    text: '1d'
                                }, {
                                    type: 'day',
                                    count: 3,
                                    text: '3d'
                                }, {
                                    type: 'week',
                                    count: 1,
                                    text: '1w'
                                }, {
                                    type: 'month',
                                    count: 1,
                                    text: '1m'
                                }, {
                                    type: 'month',
                                    count: 3,
                                    text: '3m'
                                }, {
                                    type: 'month',
                                    count: 6,
                                    text: '6m'
                                }, {
                                    type: 'year',
                                    count: 1,
                                    text: '1y'
                                }, {
                                    type: 'all',
                                    text: 'All'
                                }],
                                selected: 4,
                                inputBoxWidth: 130,
                                inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                inputEditDateFormat: "%Y-%m-%d %H:%M:%S"
                            },

                            navigator: {
                                adaptToUpdatedData: false
                            },

                            series: seriesOptions,
                        
                            title: {
                                text: vm.group.group_name + ' at ' + vm.station.name
                            },

                            noData: {
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    color: '#303030'
                                }
                            },

                            scrollbar: {
                                liveRedraw: false 
                            },

                            xAxis: [{
                                type: 'datetime',
                                minRange: 60000,
                                events: {
                                    afterSetExtremes: afterSetExtremes
                                }
                            }],

                            yAxis: yAxis,
                    
                        });

                  });
              }

        }
        
        function initSeriesOptions(data) {
            
            var seriesOptions = [];

            for (var i = 0; i < vm.group.parameters.list.length; i++) {
                var parameterId = vm.group.parameters.list[i].parameter_id;
                var parameterName = vm.group.parameters.list[i].parameter_name;
                var unit = vm.group.parameters.list[i].parameter_unit;
                for (var j = 0; j < vm.group.qc_levels.selected.length; j++) {
                    var seriesAverageData = [];
                    var seriesRangeData = [];
                    var qcLevel = vm.group.qc_levels.selected[j];
                    var seriesId = parameterId + '-' + qcLevel;
                    
                    for (var k = 0; k < data.length; k++) {
                        if (parameterId in data[k] && qcLevel == data[k][parameterId].qc_level) {
                            seriesAverageData = data[k][parameterId].averages;
                            seriesRangeData = data[k][parameterId].ranges;
                        }
                    }
                    
                    var averageSeries = {
                        'id': seriesId,
                        'name': parameterName + ' (Avg., QC Level: ' + qcLevel + ')',
                        'yAxis': i,
                        'color': Highcharts.getOptions().colors[i],
                        'tooltip': {
                            'valueDecimals': 2,
                            'valueSuffix': ' ' + unit
                        },
                        'marker': {
                            'fillColor': 'white',
                            'lineWidth': 2,
                            'lineColor': Highcharts.getOptions().colors[i]
                        },
                        //'dataGrouping': {
                        //    'enabled': false
                        //},
                        'showInNavigator': true,
                        'data': seriesAverageData
                    };
                    
                    var rangeSeries = {
                        'id': seriesId + '-ranges',
                        'name': parameterName + ' (Min. - Max., QC Level: ' + qcLevel + ')',
                        'type': 'areasplinerange',
                        'yAxis': i,
                        'lineWidth': 0,
                        'color': Highcharts.getOptions().colors[i],
                        'fillOpacity': 0.3,
                        'marker': {
                            'enabled': false
                        },
                        'tooltip': {
                            'valueDecimals': 2,
                            'valueSuffix': ' ' + unit
                        },
                        'visible': false,
                        'data': seriesRangeData
                    };
                    
                    seriesOptions.push(averageSeries);
                    seriesOptions.push(rangeSeries);
                    
                }
                
            }

            return seriesOptions;
        }
        
        function initTableHeader() {
            var tableHeader = [];
            for (var i = 0; i < vm.group.parameters.list.length; i++) {
                var parameterId = vm.group.parameters.list[i].parameter_id;
                var parameterName = vm.group.parameters.list[i].parameter_name;
                var minHeader = 'Min. ' + parameterName;
                var avgHeader = 'Avg. ' + parameterName;
                var maxHeader = 'Max. ' + parameterName;
                if (vm.group.parameters.list[i].parameter_unit) {
                    minHeader += ' (' + vm.group.parameters.list[i].parameter_unit + ')';
                    avgHeader += ' (' + vm.group.parameters.list[i].parameter_unit + ')';
                    maxHeader += ' (' + vm.group.parameters.list[i].parameter_unit + ')';
                }
                tableHeader.push({'parameterId': parameterId, 'header': minHeader, 'valueType': 'min_value'});
                tableHeader.push({'parameterId': parameterId, 'header': avgHeader, 'valueType': 'avg_value'});
                tableHeader.push({'parameterId': parameterId, 'header': maxHeader, 'valueType': 'max_value'});
            }

            return tableHeader;
        }
        
        function initTable() {
            vm.tableOptionsAll = [];
            
            if (vm.group.frequencies.selected === 'Dynamic') {
                getDynamicTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(qcData) || qcData.length) {
                                var tableOptions = initDynamicTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                        
                });
            }
            
            else if (vm.group.frequencies.selected === 'Daily') {
                getDailyTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(data) || data.length) {
                                var tableOptions = initDateTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                });
            }
            
            else if (vm.group.frequencies.selected === 'Hourly') {
                getHourlyTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(data) || data.length) {
                                var tableOptions = initDateHourTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                });
            }
            
            else if (vm.group.frequencies.selected === '30 Min') {
                getThirtyMinTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(data) || data.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                });
            }
            
            else if (vm.group.frequencies.selected === '20 Min') {
                getTwentyMinTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(data) || data.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                });
            }
            
            else if (vm.group.frequencies.selected === '15 Min') {
                getFifteenMinTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(data) || data.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                });
            }
            
            else if (vm.group.frequencies.selected === '10 Min') {
                getTenMinTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(data) || data.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                });
            }
            
            else if (vm.group.frequencies.selected === '5 Min') {
                getFiveMinTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(data) || data.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                });
            }
            
            else if (vm.group.frequencies.selected === '1 Min') {
                getOneMinTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(data) || data.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                });
            }
            
            else if (vm.group.frequencies.selected === '1 Sec') {
                getOneSecTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        for (var j = 0; j < data.length; j++) {
                            var qcData = data[j];
                            if (Array.isArray(data) || data.length) {
                                var tableOptions = initTimestampTableOptions(qcData);
                                vm.tableOptionsAll.push(tableOptions);
                            }
                        }
                });
            }
            
        }
        
        function inityAxis() {
            var yAxis = [];
            
            for (var i = 0; i < vm.group.parameters.list.length; i++) {
                var unit = vm.group.parameters.list[i].parameter_unit;
                var screenSizeIsLarge = $mdMedia('(min-width: 500px)');
                var axis = {
                    labels: {
                        format: '{value} ' + unit,
                        style: {
                            color: Highcharts.getOptions().colors[i]
                        }
                    },
                    opposite: (i % 2 == 0) ? true : false,
                    title: {
                        text: vm.group.parameters.list[i].parameter_name,
                        style: {
                            color: Highcharts.getOptions().colors[i]
                        }
                    },
                    visible: (screenSizeIsLarge) ? true: false,
                };

                yAxis.push(axis);
            }

            return yAxis;
        }
        
        function onInit() {
            initChart();
            initTable();
        }
    
    }

})();
