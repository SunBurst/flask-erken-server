(function() {
    'use strict';
    
    angular
        .module('app.station')
        .directive('stationDataParameter', stationDataParameter);

    function stationDataParameter() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'static/partials/station/station-data-parameter.directive.html',
            scope: {
                station: '=',
                parameter: '='
            },
            controller: StationDataParameterItemCtrl,
            controllerAs: 'stationDataParameterItemVm',
            bindToController: true
        };

        return directive;
    }
    
    StationDataParameterItemCtrl.$inject = [
        '$mdMedia', '$q', 'CoreFactory', 'HighchartsDefaultOptions', 'stationMeasurements'
    ];
    
    function StationDataParameterItemCtrl($mdMedia, $q, CoreFactory, HighchartsDefaultOptions, stationMeasurements) {
        var vm = this;
        
        vm.$onInit = onInit;
        vm.frequencyChange = frequencyChange;
        vm.getHeader = getHeader;
        vm.prepareCSVExport = prepareCSVExport;
        vm.qcLevelChange = qcLevelChange;
        
        vm.chartId;
        vm.tableOptionsAll = [];
        
        var chart;
        
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
                'name': vm.parameter.parameter + ' - QC Level ' + dataQcLevel,
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
                'name': vm.parameter.parameter + ' - QC Level ' + dataQcLevel,
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
                'name': vm.parameter.parameter + ' - QC Level ' + dataQcLevel,
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
                'name': vm.parameter.parameter + ' - QC Level ' + dataQcLevel,
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
            for (var sensorId in vm.parameter.sensors.sensors) {
                if (vm.parameter.sensors.sensors.hasOwnProperty(sensorId)) {
                    for (var j = 0; j < vm.parameter.qc_levels.selected.length; j++) {
                        var qcLevel = vm.parameter.qc_levels.selected[j];
                        var averageSeriesId = sensorId + '-' + qcLevel;
                        var rangeSeriesId = sensorId + '-' + qcLevel + '-ranges';
                        var averageSeries = chart.get(averageSeriesId);
                        var rangeSeries = chart.get(rangeSeriesId);
                        
                        var qcLevelDataFound = false;
                        for (var k = 0; k < data.length; k++) {
                            if (sensorId in data[k]) {
                                var dataQcLevel = data[k][sensorId].qc_level;
                                if (qcLevel == dataQcLevel) {
                                    qcLevelDataFound = true;
                                    averageSeries.setData(data[k][sensorId].averages);
                                    rangeSeries.setData(data[k][sensorId].ranges);
                                }
                            }
                        }
                        
                        if (!qcLevelDataFound) {
                            averageSeries.setData([], false);
                            rangeSeries.setData([], false);
                        }
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
                
                if (vm.parameter.frequencies.selected === 'Dynamic') {
                    
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
                
                else if (vm.parameter.frequencies.selected === 'Daily') {
                    
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
                
                else if (vm.parameter.frequencies.selected === 'Hourly') {
                    
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
                
                else if (vm.parameter.frequencies.selected === '30 Min') {
                    
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
                
                else if (vm.parameter.frequencies.selected === '20 Min') {
                    
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
                
                else if (vm.parameter.frequencies.selected === '15 Min') {
                    
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
                
                else if (vm.parameter.frequencies.selected === '10 Min') {
                    
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
                
                else if (vm.parameter.frequencies.selected === '5 Min') {
                    
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
                
                else if (vm.parameter.frequencies.selected === '1 Min') {
                    
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
                
                else if (vm.parameter.frequencies.selected === '1 Sec') {
                    
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
                    var headerName = tableToExport.header[j].header;
                    var valueType = tableToExport.header[j].valueType;
                    var measurement = tableToExport.data[i][valueType]
                    row[headerName] = measurement;
                }
                
                data.push(row);
            }
            
            return data;
        }
        
        function generateChartId() {
            var str = 'chart-' + vm.parameter.parameter + '-' + vm.parameter.parameter_type;
            return stringToDashLowerCase(str);
        }
        
        function stringToDashLowerCase(str) {
            return CoreFactory.stringToDashLowerCase(str);
        }
        
        // Dynamic
        
        function getDynamicChartDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getDynamicSingleParameterMeasurementsChart(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getDynamicChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getDynamicChartDataByQCLevel(qcLevel, start, end);
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })

        }
        
        function getDynamicTableDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getDynamicSingleParameterMeasurementsTimeGrouped(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getDynamicTableData(start, end) {
            var promiseArray = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getDynamicTableDataByQCLevel(qcLevel, start, end);
                promiseArray.push(resource);
            }
            return $q.all(promiseArray).then(function(data) {
                return data;
            })
        }
        
        // Daily
        
        function getDailyChartDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getDailySingleParameterMeasurementsChart(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getDailyChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getDailyChartDataByQCLevel(qcLevel, start, end);
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })

        }
        
        function getDailyProfileChartDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getDailyProfileMeasurementsChart(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getDailyProfileChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getDailyProfileChartDataByQCLevel(qcLevel, start, end);
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })

        }
        
        function getDailyTableDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getDailySingleParameterMeasurements(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getDailyTableData(start, end) {
            var promiseArray = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getDailyTableDataByQCLevel(qcLevel, start, end);
                promiseArray.push(resource);
            }
            return $q.all(promiseArray).then(function(data) {
                return data;
            })
        }
        
        // Hourly
        
        function getHourlyChartDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getHourlySingleParameterMeasurementsChart(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getHourlyChartDataByQCLevel(qcLevel, start, end);
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })

        }
        
        function getHourlyTableDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getHourlySingleParameterMeasurements(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyTableData(start, end) {
            var promiseArray = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getHourlyTableDataByQCLevel(qcLevel, start, end);
                promiseArray.push(resource);
            }
            return $q.all(promiseArray).then(function(data) {
                return data;
            })
        }
        
        function getHourlyProfileChartDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getHourlyProfileMeasurementsChart(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyProfileChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getHourlyProfileChartDataByQCLevel(qcLevel, start, end);
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })

        }
        
        // 30 Min
        
        function getThirtyMinChartDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getThirtyMinSingleParameterMeasurementsChart(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getThirtyMinChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getThirtyMinChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getThirtyMinTableDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getThirtyMinSingleParameterMeasurements(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getThirtyMinTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getThirtyMinTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getThirtyMinProfileChartDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getThirtyMinProfileMeasurementsChart(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getThirtyMinProfileChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getThirtyMinProfileChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        // 20 Min
        
        function getTwentyMinChartDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getTwentyMinSingleParameterMeasurementsChart(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTwentyMinChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getTwentyMinChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getTwentyMinTableDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getTwentyMinSingleParameterMeasurements(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTwentyMinTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getTwentyMinTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        // 15 Min
        
        function getFifteenMinChartDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getFifteenMinSingleParameterMeasurementsChart(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getFifteenMinChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getFifteenMinChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getFifteenMinTableDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getFifteenMinSingleParameterMeasurements(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getFifteenMinTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getFifteenMinTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        // 10 Min
        
        function getTenMinChartDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getTenMinSingleParameterMeasurementsChart(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTenMinChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getTenMinChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getTenMinTableDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getTenMinSingleParameterMeasurements(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTenMinTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getTenMinTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        // 5 Min
        
        function getFiveMinChartDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getFiveMinSingleParameterMeasurementsChart(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getFiveMinChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getFiveMinChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getFiveMinTableDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getFiveMinSingleParameterMeasurements(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getFiveMinTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getFiveMinTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        // 1 Min
        
        function getOneMinChartDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getOneMinSingleParameterMeasurementsChart(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getOneMinChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getOneMinChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getOneMinTableDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getOneMinSingleParameterMeasurements(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getOneMinTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getOneMinTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        // 1 Sec
        
        function getOneSecChartDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getOneSecSingleParameterMeasurementsChart(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getOneSecChartData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getOneSecChartDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function getOneSecTableDataByQCLevel(qcLevel, start, end) {
            return stationMeasurements.getOneSecSingleParameterMeasurements(vm.station.id, vm.parameter.parameter, qcLevel, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getOneSecTableData(start, end) {
            var promises = [];
            for (var i = 0; i < vm.parameter.qc_levels.selected.length; i++) {
                var qcLevel = vm.parameter.qc_levels.selected[i];
                var resource = getOneSecTableDataByQCLevel(qcLevel, start, end)
                promises.push(resource);
            }
            return $q.all(promises).then(function(data) {
                return data;
            })
        }
        
        function initChart() {
            if (vm.parameter.frequencies.selected === 'Dynamic') {
                if (vm.parameter.parameter_type === 'single') {
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
                                    margin: 30
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
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }]
                            
                            });

                        });
                    }
                    
            }
            
            else if (vm.parameter.frequencies.selected === 'Daily') {
                if (vm.parameter.parameter_type === 'single') {
                    getDailyChartData(moment(0).valueOf(), moment().valueOf())
                        .then(function(data) {
                            var seriesOptions = initSeriesOptions(data);
                            chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                      });
                  }
                  
                  else if (vm.parameter.parameter_type === 'profile') {
                      getDailyProfileChartData(moment(0).valueOf(), moment().valueOf())
                          .then(function(data) {
                              var seriesOptions = initProfileSeriesOptions(data);
                              chart = new Highcharts.stockChart({
                        
                                    chart: {
                                        renderTo: vm.chartId,
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
                                        margin: 30
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
                                        text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                    yAxis: [{
                                        labels: {
                                            format: '{value} ' + vm.parameter.parameter_unit,
                                            style: {
                                                color: Highcharts.getOptions().colors[0]
                                            }
                                        },
                                        title: {
                                            text: vm.parameter.parameter,
                                            style: {
                                                color: Highcharts.getOptions().colors[0]
                                            }
                                        },
                                    }],
                            
                                });

                            
                        });
                            
                  }
            }
            
            else if (vm.parameter.frequencies.selected === 'Hourly') {
                if (vm.parameter.parameter_type === 'single') {
                    getHourlyChartData(moment(0).valueOf(), moment().valueOf())
                        .then(function(data) {
                            var seriesOptions = initSeriesOptions(data);
                            chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                      });
                  }
                  
                  else if (vm.parameter.parameter_type === 'profile') {
                      getHourlyProfileChartData(moment(0).valueOf(), moment().valueOf())
                          .then(function(data) {
                              var seriesOptions = initProfileSeriesOptions(data);
                              chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                            
                        });
                            
                  }
            }
            
            else if (vm.parameter.frequencies.selected === '30 Min') {
                if (vm.parameter.parameter_type === 'single') {
                    getThirtyMinChartData(moment(0).valueOf(), moment().valueOf())
                        .then(function(data) {
                            var seriesOptions = initSeriesOptions(data);
                            chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                      });
                  }
                  
                  else if (vm.parameter.parameter_type === 'profile') {
                      getThirtyMinProfileChartData(moment(0).valueOf(), moment().valueOf())
                          .then(function(data) {
                              var seriesOptions = initProfileSeriesOptions(data);
                              chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                            
                        });
                            
                  }
            }
                  
            else if (vm.parameter.frequencies.selected === '20 Min') {
                if (vm.parameter.parameter_type === 'single') {
                    getTwentyMinChartData(moment(0).valueOf(), moment().valueOf())
                        .then(function(data) {
                            var seriesOptions = initSeriesOptions(data);
                            chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                      });
                  }
                  
                  else if (vm.parameter.parameter_type === 'profile') {
                      getTwentyMinProfileChartData(moment(0).valueOf(), moment().valueOf())
                          .then(function(data) {
                              var seriesOptions = initProfileSeriesOptions(data);
                              chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                            
                        });
                            
                  }
            }
                  
            else if (vm.parameter.frequencies.selected === '15 Min') {
                if (vm.parameter.parameter_type === 'single') {
                    getFifteenMinChartData(moment(0).valueOf(), moment().valueOf())
                        .then(function(data) {
                            var seriesOptions = initSeriesOptions(data);
                            chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                      });
                  }
                  
                  else if (vm.parameter.parameter_type === 'profile') {
                      getFifteenMinProfileChartData(moment(0).valueOf(), moment().valueOf())
                          .then(function(data) {
                              var seriesOptions = initProfileSeriesOptions(data);
                              chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                            
                        });
                            
                  }
                
            }
            
            else if (vm.parameter.frequencies.selected === '10 Min') {
                if (vm.parameter.parameter_type === 'single') {
                    getTenMinChartData(moment(0).valueOf(), moment().valueOf())
                        .then(function(data) {
                            var seriesOptions = initSeriesOptions(data);
                            chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                      });
                  }
                  else if (vm.parameter.parameter_type === 'profile') {
                      getTenMinProfileChartData(moment(0).valueOf(), moment().valueOf())
                          .then(function(data) {
                              var seriesOptions = initProfileSeriesOptions(data);
                              chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                            
                        });
                            
                  }
            }
                  
            else if (vm.parameter.frequencies.selected === '5 Min') {
                if (vm.parameter.parameter_type === 'single') {
                    getFiveMinChartData(moment(0).valueOf(), moment().valueOf())
                        .then(function(data) {
                            var seriesOptions = initSeriesOptions(data);
                            chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                      });
                  }
                  
                  else if (vm.parameter.parameter_type === 'profile') {
                      getFiveMinProfileChartData(moment(0).valueOf(), moment().valueOf())
                          .then(function(data) {
                              var seriesOptions = initProfileSeriesOptions(data);
                              chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                            
                        });
                            
                  }
                
            }
            
            else if (vm.parameter.frequencies.selected === '1 Min') {
                if (vm.parameter.parameter_type === 'single') {
                    getOneMinChartData(moment(0).valueOf(), moment().valueOf())
                        .then(function(data) {
                            var seriesOptions = initSeriesOptions(data);
                            chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                      });
                  }
                  
                  else if (vm.parameter.parameter_type === 'profile') {
                      getOneMinProfileChartData(moment(0).valueOf(), moment().valueOf())
                          .then(function(data) {
                              var seriesOptions = initProfileSeriesOptions(data);
                              chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                            
                        });
                            
                  }
                
            }
            
            else if (vm.parameter.frequencies.selected === '1 Sec') {
                if (vm.parameter.parameter_type === 'single') {
                    getOneSecChartData(moment(0).valueOf(), moment().valueOf())
                        .then(function(data) {
                            var seriesOptions = initSeriesOptions(data);
                            chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });

                      });
                  }
                  
                  else if (vm.parameter.parameter_type === 'profile') {
                      getOneSecProfileChartData(moment(0).valueOf(), moment().valueOf())
                          .then(function(data) {
                              var seriesOptions = initProfileSeriesOptions(data);
                              chart = new Highcharts.stockChart({
                        
                                chart: {
                                    renderTo: vm.chartId,
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
                                    margin: 30
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
                                    inputBoxWidth: 130,
                                    inputDateFormat: "%Y-%m-%d %H:%M:%S",
                                    inputEditDateFormat: "%Y-%m-%d %H:%M:%S",
                                    selected: 2,
                                },

                                navigator: {
                                    adaptToUpdatedData: false
                                },

                                series: seriesOptions,
                            
                                title: {
                                    text: vm.parameter.parameter + ' at ' + vm.station.name
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

                                yAxis: [{
                                    labels: {
                                        format: '{value} ' + vm.parameter.parameter_unit,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                    title: {
                                        text: vm.parameter.parameter,
                                        style: {
                                            color: Highcharts.getOptions().colors[0]
                                        }
                                    },
                                }],
                        
                            });
                            
                        });
                            
                  }
                
            }

        }
        
        function initSeriesOptions(data) {
            
            var seriesOptions = [];

            var parameter = vm.parameter.parameter;
            var unit = vm.parameter.parameter_unit;
            for (var sensorId in vm.parameter.sensors.sensors) {
                if (vm.parameter.sensors.sensors.hasOwnProperty(sensorId)) {
                    var sensorName = vm.parameter.sensors.sensors[sensorId];
                    for (var j = 0; j < vm.parameter.qc_levels.selected.length; j++) {
                        var seriesAverageData = [];
                        var seriesRangeData = [];
                        var qcLevel = vm.parameter.qc_levels.selected[j];
                        var seriesId = stringToDashLowerCase(sensorId + '-' + qcLevel);
                        for (var k = 0; k < data.length; k++) {
                            if (sensorId in data[k] && qcLevel == data[k][sensorId].qc_level) {
                                seriesAverageData = data[k][sensorId].averages;
                                seriesRangeData = data[k][sensorId].ranges;
                            }
                        }
                        
                        var averageSeries = {
                            'id': seriesId,
                            'name': sensorName + ' (Avg., QC Level: ' + qcLevel + ')',
                            'color': Highcharts.getOptions().colors[j],
                            'tooltip': {
                                'valueDecimals': 2,
                                'valueSuffix': ' ' + unit
                            },
                            'marker': {
                                'fillColor': 'white',
                                'lineWidth': 2,
                                'lineColor': Highcharts.getOptions().colors[j]
                            },
                            //'dataGrouping': {
                            //    'enabled': false
                            //},
                            'showInNavigator': true,
                            'data': seriesAverageData
                        };
                        
                        var rangeSeries = {
                            'id': seriesId + '-ranges',
                            'name': sensorName + ' (Min. - Max., QC Level: ' + qcLevel + ')',
                            'type': 'areasplinerange',
                            'lineWidth': 0,
                            'color': Highcharts.getOptions().colors[j],
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
            }

            return seriesOptions;
        }
        
        function initProfileSeriesOptions(data) {
            var seriesOptions = [];

            var parameter = vm.parameter.parameter;
            var unit = vm.parameter.parameter_unit;
            for (var i = 0; i < vm.parameter.vertical_positions.length; i++) {
                var vertPos = vm.parameter.vertical_positions[i].vertical_position;
                for (var sensorId in vm.parameter.sensors.sensors) {
                    if (vm.parameter.sensors.sensors.hasOwnProperty(sensorId)) {
                        var sensorName = vm.parameter.sensors.sensors[sensorId];
                        for (var j = 0; j < vm.parameter.qc_levels.selected.length; j++) {
                            var qcLevel = vm.parameter.qc_levels.selected[j];
                            
                            var seriesAverageData = [];
                            var seriesRangeData = [];
                            
                            var seriesId = stringToDashLowerCase(vertPos + '-' + sensorId + '-' + qcLevel);

                            for (var k = 0; k < data.length; k++) {
                                if (sensorId in data[k] && qcLevel == data[k][sensorId].qc_level) {
                                    for (var l = 0; l < data[k][sensorId].data.length; l++) {
                                        if (vertPos == data[k][sensorId].data[l].vertical_position) {
                                            seriesAverageData = data[k][sensorId].data[l].averages;
                                            seriesRangeData = data[k][sensorId].data[l].ranges;
                                        }
                                        
                                    }
                                }   
                            }
                            
                            var averageSeries = {
                                'id': seriesId,
                                'name': vertPos + ' m ' + sensorName + ' (Avg., QC Level: ' + qcLevel + ')',
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
                                'name': vertPos + ' m ' + sensorName + ' (Min. - Max., QC Level: ' + qcLevel + ')',
                                'type': 'areasplinerange',
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
                }
            }

            return seriesOptions;
        }
        
        function onInit() {
            vm.chartId = generateChartId();
            initChart();
            initTable();
        }
        
        function qcLevelChange() {
            initChart();
            initTable();
        }
        
        function initTableHeader() {
            var tableHeader = [];
            var parameter = vm.parameter.parameter;
            var unit = vm.parameter.parameter_unit;
            var minHeader = 'Min. ' + parameter;
            var avgHeader = 'Avg. ' + parameter;
            var maxHeader = 'Max. ' + parameter;
            if (unit) {
                minHeader += ' (' + unit + ')';
                avgHeader += ' (' + unit + ')';
                maxHeader += ' (' + unit + ')';
            }
            tableHeader.push({'parameter': parameter, 'header': minHeader, 'valueType': 'min_value'});
            tableHeader.push({'parameter': parameter, 'header': avgHeader, 'valueType': 'avg_value'});
            tableHeader.push({'parameter': parameter, 'header': maxHeader, 'valueType': 'max_value'});

            return tableHeader;
        }
        
        function initTable() {
            vm.tableOptionsAll = [];
            
            if (vm.parameter.frequencies.selected === 'Dynamic') {
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
            
            else if (vm.parameter.frequencies.selected === 'Daily') {
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
            
            else if (vm.parameter.frequencies.selected === 'Hourly') {
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
            
            else if (vm.parameter.frequencies.selected === '30 Min') {
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
            
            else if (vm.parameter.frequencies.selected === '20 Min') {
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
            
            else if (vm.parameter.frequencies.selected === '15 Min') {
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
            
            else if (vm.parameter.frequencies.selected === '10 Min') {
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
            
            else if (vm.parameter.frequencies.selected === '5 Min') {
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
            
            else if (vm.parameter.frequencies.selected === '1 Min') {
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
            
            else if (vm.parameter.frequencies.selected === '1 Sec') {
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
        
    }

})();
