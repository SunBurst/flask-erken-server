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
    
    StationDataGroupItemCtrl.$inject = ['$mdMedia', 'stationMeasurements'];
    
    function StationDataGroupItemCtrl($mdMedia, stationMeasurements) {
        var vm = this;
        
        vm.$onInit = onInit;
        vm.frequencyChange = frequencyChange;
        vm.getHeader = getHeader;
        vm.prepareCSVExport = prepareCSVExport;
        
        vm.tableOptions = {
            options: {
                decapitate: false,
                boundaryLinks: false,
                limitSelect: true,
                pageSelect: true
            },
            query: {
                label: 'Timestamp',
                order: 'timestamp',
                dateFormat: 'yyyy-MM-dd HH:mm:ss',
                momentDateFormat: 'YYYY-MM-DD HH:mm:ss',
                limit: 5,
                page: 1
            },
            count: 0,
            header: [],
            data: [],
            isReady: false
        };
        
        var chart;
        
        function afterSetExtremes(e) {
            if (e.trigger != undefined) {
                var min = Math.round(e.min);
                var max = Math.round(e.max);
                chart.showLoading('Loading data from server...');
                if (vm.group.frequencies.selected === 'Dynamic') {
                    getChartData(min, max).then(function(data) {
                        for (var i = 0; i < vm.group.parameters.list.length; i++) {
                            var parameterId = vm.group.parameters.list[i].parameter_id;
                            var averageSeriesId = parameterId;
                            var rangeSeriesId = parameterId + '-ranges';
                            var averageSeries = chart.get(averageSeriesId);
                            var rangeSeries = chart.get(rangeSeriesId);
                            
                            if (parameterId in data) {
                                averageSeries.setData(data[parameterId].averages);
                                rangeSeries.setData(data[parameterId].ranges);
                            }
                            else {
                                averageSeries.setData([], false);
                                rangeSeries.setData([], false);
                            }
                            
                        }
                        
                        chart.hideLoading();
                        chart.redraw();
                    });
                    vm.tableOptions.data = [];
                    vm.tableOptions.count = 0;
                    vm.tableOptions.isReady = false;
                    getTableData(min, max).then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            var firstRow = data[0];
                            if ('date' in firstRow) {
                                vm.tableOptions.query.order = 'date';
                                vm.tableOptions.query.label = 'Date';
                                vm.tableOptions.query.dateFormat = 'yyyy-MM-dd';
                                vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD';
                            }
                            else if ('date_hour' in firstRow) {
                                vm.tableOptions.query.order = 'date_hour';
                                vm.tableOptions.query.label = 'Date & Hour';
                                vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm';
                                vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm';
                            }
                            else if ('timestamp' in firstRow) {
                                vm.tableOptions.query.order = 'timestamp';
                                vm.tableOptions.query.label = 'Timestamp';
                                vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                                vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            }
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                    });
                }
                else if (vm.group.frequencies.selected === 'Daily') {
                    getDailyChartData(min, max).then(function(data) {
                        for (var i = 0; i < vm.group.parameters.list.length; i++) {
                            var parameterId = vm.group.parameters.list[i].parameter_id;
                            var averageSeriesId = parameterId;
                            var rangeSeriesId = parameterId + '-ranges';
                            var averageSeries = chart.get(averageSeriesId);
                            var rangeSeries = chart.get(rangeSeriesId);
                            
                            if (parameterId in data) {
                                averageSeries.setData(data[parameterId].averages);
                                rangeSeries.setData(data[parameterId].ranges);
                            }
                            else {
                                averageSeries.setData([], false);
                                rangeSeries.setData([], false);
                            }
                            
                        }
                        
                        chart.hideLoading();
                        chart.redraw();
                    });
                    vm.tableOptions.data = [];
                    vm.tableOptions.count = 0;
                    vm.tableOptions.isReady = false;
                    getDailyTableData(min, max).then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'date';
                            vm.tableOptions.query.label = 'Date';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                    });
                }
                else if (vm.group.frequencies.selected === 'Hourly') {
                    getHourlyChartData(min, max).then(function(data) {
                        for (var i = 0; i < vm.group.parameters.list.length; i++) {
                            var parameterId = vm.group.parameters.list[i].parameter_id;
                            var averageSeriesId = parameterId;
                            var rangeSeriesId = parameterId + '-ranges';
                            var averageSeries = chart.get(averageSeriesId);
                            var rangeSeries = chart.get(rangeSeriesId);
                            
                            if (parameterId in data) {
                                averageSeries.setData(data[parameterId].averages);
                                rangeSeries.setData(data[parameterId].ranges);
                            }
                            else {
                                averageSeries.setData([], false);
                                rangeSeries.setData([], false);
                            }
                            
                        }
                        
                        chart.hideLoading();
                        chart.redraw();
                    });
                    vm.tableOptions.data = [];
                    vm.tableOptions.count = 0;
                    vm.tableOptions.isReady = false;
                    getHourlyTableData(min, max).then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'date_hour';
                            vm.tableOptions.query.label = 'Date & Hour';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                    });
                }
                else if (vm.group.frequencies.selected === '30 Min') {
                    getThirtyMinChartData(min, max).then(function(data) {
                        for (var i = 0; i < vm.group.parameters.list.length; i++) {
                            var parameterId = vm.group.parameters.list[i].parameter_id;
                            var averageSeriesId = parameterId;
                            var rangeSeriesId = parameterId + '-ranges';
                            var averageSeries = chart.get(averageSeriesId);
                            var rangeSeries = chart.get(rangeSeriesId);
                            
                            if (parameterId in data) {
                                averageSeries.setData(data[parameterId].averages);
                                rangeSeries.setData(data[parameterId].ranges);
                            }
                            else {
                                averageSeries.setData([], false);
                                rangeSeries.setData([], false);
                            }
                            
                        }
                        
                        chart.hideLoading();
                        chart.redraw();
                    });
                    vm.tableOptions.data = [];
                    vm.tableOptions.count = 0;
                    vm.tableOptions.isReady = false;
                    getThirtyMinTableData(min, max).then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'timestamp';
                            vm.tableOptions.query.label = 'Timestamp';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                    });
                }
                
                else if (vm.group.frequencies.selected === '20 Min') {
                    getTwentyMinChartData(min, max).then(function(data) {
                        for (var i = 0; i < vm.group.parameters.list.length; i++) {
                            var parameterId = vm.group.parameters.list[i].parameter_id;
                            var averageSeriesId = parameterId;
                            var rangeSeriesId = parameterId + '-ranges';
                            var averageSeries = chart.get(averageSeriesId);
                            var rangeSeries = chart.get(rangeSeriesId);
                            
                            if (parameterId in data) {
                                averageSeries.setData(data[parameterId].averages);
                                rangeSeries.setData(data[parameterId].ranges);
                            }
                            else {
                                averageSeries.setData([], false);
                                rangeSeries.setData([], false);
                            }
                            
                        }
                        
                        chart.hideLoading();
                        chart.redraw();
                    });
                    vm.tableOptions.data = [];
                    vm.tableOptions.count = 0;
                    vm.tableOptions.isReady = false;
                    getTwentyMinTableData(min, max).then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'timestamp';
                            vm.tableOptions.query.label = 'Timestamp';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                    });
                }
                
                else if (vm.group.frequencies.selected === '15 Min') {
                    getFifteenMinChartData(min, max).then(function(data) {
                        for (var i = 0; i < vm.group.parameters.list.length; i++) {
                            var parameterId = vm.group.parameters.list[i].parameter_id;
                            var averageSeriesId = parameterId;
                            var rangeSeriesId = parameterId + '-ranges';
                            var averageSeries = chart.get(averageSeriesId);
                            var rangeSeries = chart.get(rangeSeriesId);
                            
                            if (parameterId in data) {
                                averageSeries.setData(data[parameterId].averages);
                                rangeSeries.setData(data[parameterId].ranges);
                            }
                            else {
                                averageSeries.setData([], false);
                                rangeSeries.setData([], false);
                            }
                            
                        }
                        
                        chart.hideLoading();
                        chart.redraw();
                    });
                    vm.tableOptions.data = [];
                    vm.tableOptions.count = 0;
                    vm.tableOptions.isReady = false;
                    getFifteenMinTableData(min, max).then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'timestamp';
                            vm.tableOptions.query.label = 'Timestamp';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                    });
                }
                
                else if (vm.group.frequencies.selected === '10 Min') {
                    getTenMinChartData(min, max).then(function(data) {
                        for (var i = 0; i < vm.group.parameters.list.length; i++) {
                            var parameterId = vm.group.parameters.list[i].parameter_id;
                            var averageSeriesId = parameterId;
                            var rangeSeriesId = parameterId + '-ranges';
                            var averageSeries = chart.get(averageSeriesId);
                            var rangeSeries = chart.get(rangeSeriesId);
                            
                            if (parameterId in data) {
                                averageSeries.setData(data[parameterId].averages);
                                rangeSeries.setData(data[parameterId].ranges);
                            }
                            else {
                                averageSeries.setData([], false);
                                rangeSeries.setData([], false);
                            }
                            
                        }
                        
                        chart.hideLoading();
                        chart.redraw();
                    });
                    vm.tableOptions.data = [];
                    vm.tableOptions.count = 0;
                    vm.tableOptions.isReady = false;
                    getTenMinTableData(min, max).then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'timestamp';
                            vm.tableOptions.query.label = 'Timestamp';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                    });
                }
                
                else if (vm.group.frequencies.selected === '5 Min') {
                    getFiveMinChartData(min, max).then(function(data) {
                        for (var i = 0; i < vm.group.parameters.list.length; i++) {
                            var parameterId = vm.group.parameters.list[i].parameter_id;
                            var averageSeriesId = parameterId;
                            var rangeSeriesId = parameterId + '-ranges';
                            var averageSeries = chart.get(averageSeriesId);
                            var rangeSeries = chart.get(rangeSeriesId);
                            
                            if (parameterId in data) {
                                averageSeries.setData(data[parameterId].averages);
                                rangeSeries.setData(data[parameterId].ranges);
                            }
                            else {
                                averageSeries.setData([], false);
                                rangeSeries.setData([], false);
                            }
                            
                        }
                        
                        chart.hideLoading();
                        chart.redraw();
                    });
                    vm.tableOptions.data = [];
                    vm.tableOptions.count = 0;
                    vm.tableOptions.isReady = false;
                    getFiveMinTableData(min, max).then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'timestamp';
                            vm.tableOptions.query.label = 'Timestamp';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                    });
                }
                
                else if (vm.group.frequencies.selected === '1 Min') {
                    getOneMinChartData(min, max).then(function(data) {
                        for (var i = 0; i < vm.group.parameters.list.length; i++) {
                            var parameterId = vm.group.parameters.list[i].parameter_id;
                            var averageSeriesId = parameterId;
                            var rangeSeriesId = parameterId + '-ranges';
                            var averageSeries = chart.get(averageSeriesId);
                            var rangeSeries = chart.get(rangeSeriesId);
                            
                            if (parameterId in data) {
                                averageSeries.setData(data[parameterId].averages);
                                rangeSeries.setData(data[parameterId].ranges);
                            }
                            else {
                                averageSeries.setData([], false);
                                rangeSeries.setData([], false);
                            }
                            
                        }
                        
                        chart.hideLoading();
                        chart.redraw();
                    });
                    vm.tableOptions.data = [];
                    vm.tableOptions.count = 0;
                    vm.tableOptions.isReady = false;
                    getOneMinTableData(min, max).then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'timestamp';
                            vm.tableOptions.query.label = 'Timestamp';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                    });
                }
                
            }
        }
        
        function frequencyChange() {
            initChart();
            initTable();
        }
        
        function getChartData(start, end) {
            return stationMeasurements.getGroupMeasurementsChart(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getDailyChartData(start, end) {
            return stationMeasurements.getDailyGroupMeasurementsChart(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getDailyTableData(start, end) {
            return stationMeasurements.getDailyGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getFiveMinChartData(start, end) {
            return stationMeasurements.getFiveMinGroupMeasurementsChart(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getOneMinChartData(start, end) {
            return stationMeasurements.getOneMinGroupMeasurementsChart(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getFiveMinTableData(start, end) {
            return stationMeasurements.getFiveMinGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getOneMinTableData(start, end) {
            return stationMeasurements.getOneMinGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getThirtyMinChartData(start, end) {
            return stationMeasurements.getThirtyMinGroupMeasurementsChart(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTwentyMinChartData(start, end) {
            return stationMeasurements.getTwentyMinGroupMeasurementsChart(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getFifteenMinChartData(start, end) {
            return stationMeasurements.getFifteenMinGroupMeasurementsChart(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTenMinChartData(start, end) {
            return stationMeasurements.getTenMinGroupMeasurementsChart(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyChartData(start, end) {
            return stationMeasurements.getHourlyGroupMeasurementsChart(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyTableData(start, end) {
            return stationMeasurements.getHourlyGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getThirtyMinTableData(start, end) {
            return stationMeasurements.getThirtyMinGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTwentyMinTableData(start, end) {
            return stationMeasurements.getTwentyMinGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getFifteenMinTableData(start, end) {
            return stationMeasurements.getFifteenMinGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTenMinTableData(start, end) {
            return stationMeasurements.getTenMinGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTableData(start, end) {
            return stationMeasurements.getGroupMeasurementsTimeGrouped(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHeader() {
            var header = [];
            var timeLabel = vm.tableOptions.query.label + ' (Local Time)';
            header.push(timeLabel);
            
            for (var i = 0; i < vm.tableOptions.header.length; i++) {
                header.push(vm.tableOptions.header[i].header);
            }
            
            return header;
            
        }
        
        function prepareCSVExport() {
            var data = [];
            var timeLabel = vm.tableOptions.query.label;
            for (var i = 0; i < vm.tableOptions.count; i++) {
                var timestamp = vm.tableOptions.data[i][vm.tableOptions.query.order];
                var date = moment(timestamp).format(vm.tableOptions.query.momentDateFormat);
                var row = {timeLabel: date}
                for (var j = 0; j < vm.tableOptions.header.length; j++) {
                    var parameterId = vm.tableOptions.header[j].parameterId;
                    var headerName = vm.tableOptions.header[j].header;
                    var valueType = vm.tableOptions.header[j].valueType;
                    var measurement = vm.tableOptions.data[i].data[parameterId][valueType]
                    row[headerName] = measurement;
                }
                
                data.push(row);
            }
            
            return data;
        }
        
        function initChart() {
            var chartId = 'chart-' + vm.group.group_id;
            var yAxis = inityAxis();
            
            if (vm.group.frequencies.selected === 'Dynamic') {
                getChartData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        var seriesOptions = initSeriesOptions(data);
                        chart = new Highcharts.stockChart({
                    
                            chart: {
                                renderTo: chartId,
                                style: {
                                    fontFamily: 'Roboto'
                                },
                                type: 'spline',
                                zoomType: 'x'
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
                                //allButtonsEnabled: true,
                                buttons: [{
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
                                minRange: 3600 * 1000,
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
                                type: 'spline',
                                zoomType: 'x'
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
                                //allButtonsEnabled: true,
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
                                selected: 4,
                                //inputEnabled: true
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
                                type: 'spline',
                                zoomType: 'x'
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
                                //allButtonsEnabled: true,
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
                                //inputEnabled: true
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
                                type: 'spline',
                                zoomType: 'x'
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
                                //allButtonsEnabled: true,
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
                                //inputEnabled: true
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
                                type: 'spline',
                                zoomType: 'x'
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
                                //allButtonsEnabled: true,
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
                                //inputEnabled: true
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
                                type: 'spline',
                                zoomType: 'x'
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
                                //allButtonsEnabled: true,
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
                                //inputEnabled: true
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
                                type: 'spline',
                                zoomType: 'x'
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
                                //allButtonsEnabled: true,
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
                                //inputEnabled: true
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
                                type: 'spline',
                                zoomType: 'x'
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
                                //allButtonsEnabled: true,
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
                                //inputEnabled: true
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
                                type: 'spline',
                                zoomType: 'x'
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
                                //allButtonsEnabled: true,
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
                                //inputEnabled: true
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

        }
        
        function initSeriesOptions(data) {
            
            var seriesOptions = [];
            
            for (var i = 0; i < vm.group.parameters.list.length; i++) {
                var seriesAverageData = [];
                var seriesRangeData = [];
                var parameterId = vm.group.parameters.list[i].parameter_id;
                var seriesId = parameterId;
                var seriesName = vm.group.parameters.list[i].parameter_name;
                var unit = vm.group.parameters.list[i].parameter_unit;
                
                if (parameterId in data) {
                    seriesAverageData = data[parameterId].averages;
                    seriesRangeData = data[parameterId].ranges;
                }
                
                var averageSeries = {
                    'id': seriesId,
                    'name': seriesName + ' (Avg.)',
                    'yAxis': i,
                    'tooltip': {
                        'valueDecimals': 2,
                        'valueSuffix': ' ' + unit
                    },
                    'marker': {
                        'fillColor': 'white',
                        'lineWidth': 2,
                        'lineColor': Highcharts.getOptions().colors[i]
                    },
                    'dataGrouping': {
                        'enabled': false
                    },
                    'showInNavigator': true,
                    'data': seriesAverageData
                };
                
                var rangeSeries = {
                    'id': seriesId + '-ranges',
                    'name': seriesName + ' (Min. - Max.)',
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
            vm.tableOptions.header = initTableHeader();
            if (vm.group.frequencies.selected === 'Dynamic') {
                getTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            var firstRow = data[0];
                            if ('date' in firstRow) {
                                vm.tableOptions.query.order = 'date';
                                vm.tableOptions.query.label = 'Date';
                                vm.tableOptions.query.dateFormat = 'yyyy-MM-dd';
                                vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD';
                            }
                            else if ('date_hour' in firstRow) {
                                vm.tableOptions.query.order = 'date_hour';
                                vm.tableOptions.query.label = 'Date & Hour';
                                vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm';
                                vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm';
                            }
                            else if ('timestamp' in firstRow) {
                                vm.tableOptions.query.order = 'timestamp';
                                vm.tableOptions.query.label = 'Timestamp';
                                vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                                vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            }
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                });
            }
            
            else if (vm.group.frequencies.selected === 'Daily') {
                getDailyTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'date';
                            vm.tableOptions.query.label = 'Date';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                });
            }
            
            else if (vm.group.frequencies.selected === 'Hourly') {
                getHourlyTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'date_hour';
                            vm.tableOptions.query.label = 'Date & Hour';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                });
            }
            
            else if (vm.group.frequencies.selected === '30 Min') {
                getThirtyMinTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'timestamp';
                            vm.tableOptions.query.label = 'Timestamp';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                });
            }
            
            else if (vm.group.frequencies.selected === '20 Min') {
                getTwentyMinTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'timestamp';
                            vm.tableOptions.query.label = 'Timestamp';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                });
            }
            
            else if (vm.group.frequencies.selected === '15 Min') {
                getFifteenMinTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'timestamp';
                            vm.tableOptions.query.label = 'Timestamp';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                });
            }
            
            else if (vm.group.frequencies.selected === '10 Min') {
                getTenMinTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'timestamp';
                            vm.tableOptions.query.label = 'Timestamp';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                });
            }
            
            else if (vm.group.frequencies.selected === '5 Min') {
                getFiveMinTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'timestamp';
                            vm.tableOptions.query.label = 'Timestamp';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
                });
            }
            
            else if (vm.group.frequencies.selected === '1 Min') {
                getOneMinTableData(moment(0).valueOf(), moment().valueOf())
                    .then(function(data) {
                        if (Array.isArray(data) || data.length) {
                            vm.tableOptions.query.order = 'timestamp';
                            vm.tableOptions.query.label = 'Timestamp';
                            vm.tableOptions.query.dateFormat = 'yyyy-MM-dd HH:mm:ss';
                            vm.tableOptions.query.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';
                            vm.tableOptions.count = data.length;
                            vm.tableOptions.data = data;
                        }
                        vm.tableOptions.isReady = true;
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
