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
    
    StationDataGroupItemCtrl.$inject = ['stationMeasurements'];
    
    function StationDataGroupItemCtrl(stationMeasurements) {
        var vm = this;
        
        vm.$onInit = onInit;
        vm.chartReady = false;
        vm.options = {
            decapitate: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };
        vm.query = {};
        vm.measurements = [];
        
        function afterSetExtremes(min, max) {
            //console.log(e);
            if (e.trigger != undefined) {
                var chart = vm.chartConfig.getChartObj();
                getData(min, max).then(function(data) {
                    var series = initSeries(data);
                    chart.series = [];
                    chart.series = series;
                    chart.reflow();
                });
            }
        }
        
        vm.chartConfig = {
            
            chart: {
                zoomType: 'x'
            },
            
            credits: {
                enabled: false
            },
            
            lang: {
                noData: 'No data to display'
            },
            
            rangeSelector: {
                allButtonsEnabled: true,
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
                enabled: true
            },
            
            navigator: {
                adaptToUpdatedData: false,
                series: [],
                enabled: true
            },
            
            series: [],
            
            title: {
                text: ''
            },
            
            noData: {
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#303030'
                }
            },
            
            scrollbar: {
                enabled: true,
                liveRedraw: false
            },
            
            xAxis: [{
                type: 'datetime',
                minRange: 3600 * 1000,
                events: {
                    afterSetExtremes: function(e) {
                        if (e.trigger != undefined) {
                            var min = Math.round(e.min);
                            var max = Math.round(e.max);
                            afterSetExtremes(min, max);
                        }
                    }
                }
            }],
            
            yAxis: [],
            
            useHighStocks: true,
            
            func: function(chart) {
                vm.$evalAsync(function() {
                    chart.reflow();
                });
            }
        };
        
        function getData(start, end) {
            return stationMeasurements.getGroupMeasurementsChart(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getTableData(start, end) {
            return stationMeasurements.getGroupMeasurements(vm.station.id, vm.group.group_id, 0, start, end)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function initChart() {
            vm.chartConfig.title.text = vm.group.group_name + ' at ' + vm.station.name;
            var yAxis = inityAxis();
            vm.chartConfig.yAxis = yAxis;
            getData(moment(0).valueOf(), moment().valueOf())
                .then(function(data) {
                    var series = initSeries(data);
                    vm.chartConfig.series = series;
                    vm.chartConfig.navigator.series = series;
                    vm.chartReady = true;
                });
        }
        
        function initTable() {
            getTableData(moment(0).valueOf(), moment().valueOf())
                .then(function(data) {
                    vm.measurements = data;
                    console.log(vm.measurements);
                });
        }
        
        function inityAxis() {
            
            var yAxis = [];
            
            for (var i = 0; i < vm.group.units.list.length; i++) {
                var unit = vm.group.units.list[i];
                var unitIndex = i;
                var axis = {
                    labels: {
                        format: '{value} ' + unit,
                    },
                    opposite: (unitIndex % 2 == 0) ? true : false,
                    title: {
                        text: unit
                    }
                };
                
                yAxis.push(axis);
            }
            
            return yAxis;
        }
        
        function onInit() {
            initChart();
            initTable();
        }
        
        function initSeries(data) {
            var seriesData = [];
            
            for (var i = 0; i < data.length; i++) {
                var series = data[i];
                var unit = series.unit;
                var unitAxisIndex = vm.group.units.list.indexOf(unit);
                series['yAxis'] = unitAxisIndex;
                series['tooltip'] = {
                    valueSuffix: ' ' + unit
                };
                series['dataGrouping'] = {
                    enabled: false
                };
                seriesData.push(series);
            }

            return seriesData;
        }
    
    }

})();
