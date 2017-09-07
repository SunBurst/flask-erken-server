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
        
        vm.options = {
            decapitate: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };
        vm.query = {
            order: 'time',
            limit: 15,
            page: 1
        };
        vm.measurements = [];
        
        function afterSetExtremes(e) {
            if (e.trigger != undefined) {
                var min = Math.round(e.min);
                var max = Math.round(e.max);
                var chart = Highcharts.charts[0];
                chart.showLoading('Loading data from server...');
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
                vm.measurements = [];
                getTableData(min, max).then(function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var row = data[i];
                        if ('date' in row) {
                            row['time'] = row.date;
                        }
                        if ('date_hour' in row) {
                            row['time'] = row.date_hour;
                        }
                        if ('timestamp' in row) {
                            row['time'] = row.timestamp;
                        }
                        vm.measurements.push(row);
                    }
                });
            }
        }
        
        function getChartData(start, end) {
            return stationMeasurements.getGroupMeasurementsChart(vm.station.id, vm.group.group_id, 0, start, end)
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
        
        function initChart() {
            var chartId = 'chart-' + vm.group.group_id;
            var yAxis = inityAxis();
            getChartData(moment(0).valueOf(), moment().valueOf())
              .then(function(data) {
                var seriesOptions = initSeriesOptions(data);
                Highcharts.stockChart(chartId, {
                
                  chart: {
                      zoomType: 'x',
                      type: 'spline'
                  },

                  credits: {
                      enabled: false
                  },

                  lang: {
                      noData: 'No data to display'
                  },
                  
                  legend: {
                      enabled: true
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
                    inputEnabled: true
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
                    'name': seriesName,
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
                    'name': seriesName + ' Ranges',
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
        
        function initTable() {
            vm.measurements = [];
            getTableData(moment(0).valueOf(), moment().valueOf())
                .then(function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var row = data[i];
                        if ('date' in row) {
                            row['time'] = row.date;
                        }
                        if ('date_hour' in row) {
                            row['time'] = row.date_hour;
                        }
                        if ('timestamp' in row) {
                            row['time'] = row.timestamp;
                        }
                        vm.measurements.push(row);
                    }
            });
            console.log(vm.measurements);
        }
        
        function inityAxis() {
            var yAxis = [];

            for (var i = 0; i < vm.group.parameters.list.length; i++) {
                var unit = vm.group.parameters.list[i].parameter_unit;
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
    
    }

})();
