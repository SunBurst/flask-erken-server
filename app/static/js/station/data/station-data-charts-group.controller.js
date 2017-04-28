(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDataChartsGroupCtrl', StationDataChartsGroupCtrl);
    
    StationDataChartsGroupCtrl.$inject = [
        '$scope',
        'StationParametersFactory',
        'stationMeasurements',
        'stationStorage',
        'stationDataSource', 
        'stationDataTimeOptions', 
        'HighChartOptions'
    ];
    
    function StationDataChartsGroupCtrl($scope, StationParametersFactory, stationMeasurements, stationStorage, stationDataSource, stationDataTimeOptions, HighChartOptions) {
        var vm = this;
        
        vm.chartParameter = {
            charts: {},
            group: {}
        };
        vm.getDailyChartData = getDailyChartData;
        vm.getHighFrequencyChartData = getHighFrequencyChartData;
        vm.getHourlyChartData = getHourlyChartData;
        vm.initChart = initChart;
        vm.initChartParameter = initChartParameter;
        vm.station = stationStorage.getStation();
        vm.setChartSubtitle = setChartSubtitle;
        vm.setChartTitle = setChartTitle;
        vm.setDatePicker = setDatePicker;
        vm.setSelectedTimeOption = setSelectedTimeOption;
        vm.updateChartData = updateChartData;
        vm.updateDailyChartData = updateDailyChartData;
        vm.updateHighFrequencyChartData = updateHighFrequencyChartData;
        vm.updateHourlyChartData = updateHourlyChartData;
        
        vm.dataSourcesModel = {
            dataSources: stationDataSource.getDataSources(),
            selectedDataSource: stationDataSource.getSelectedDataSource()
        };
        
        vm.selectedTimeOption = null;
        
        vm.datePickerModel = {
            startDate: null,
            endDate: null
        }
        
        vm.setSelectedTimeOption();
        vm.setDatePicker();
        
        function getDailyChartData() {
            var stationId = vm.station.id;
            var groupId = vm.chartParameter.group.parameter_id;
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return stationMeasurements.getDailyChartParameterGroupMeasurements(stationId, groupId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHighFrequencyChartData() {
            var stationId = vm.station.id;
            var groupId = vm.chartParameter.group.parameter_id;
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return stationMeasurements.getHighFrequencyChartParameterGroupMeasurements(stationId, groupId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyChartData() {
            var stationId = vm.station.id;
            var groupId = vm.chartParameter.group.parameter_id;
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return stationMeasurements.getHourlyChartParameterGroupMeasurements(stationId, groupId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function initChartParameter(group) {
            vm.chartParameter.group = group;
            vm.chartParameter.charts.stationsAverageChart = angular.copy(HighChartOptions);
        }
        
        function initChart(chart) {
            vm.setChartSubtitle(chart);
            vm.setChartTitle(chart);
            vm.chartParameter.charts[chart].chart.zoomType = 'x';
            vm.chartParameter.charts[chart].yAxis.title.text = vm.chartParameter.group.parameter_name + ' (' + vm.chartParameter.group.parameter_unit + ')';
            vm.updateChartData();
        }
        
        function setChartTitle(chart) {
            var selectedDataSource = vm.dataSourcesModel.selectedDataSource;
            var groupName = vm.chartParameter.group.parameter_name;
            var stationName = vm.station.name;
            vm.chartParameter.charts[chart].title.text = selectedDataSource + ' ' + groupName + ' at ' + stationName;
        }
        
        function setChartSubtitle(chart) {
            var fromDate = vm.datePickerModel.startDate.format('YYYY-MM-DD HH:mm:ss');
            var toDate = vm.datePickerModel.endDate.format('YYYY-MM-DD HH:mm:ss');
            vm.chartParameter.charts[chart].subtitle.text = fromDate + ' - ' + toDate;
        }
        
        function setDatePicker() {
            vm.datePickerModel.startDate = stationDataTimeOptions.getTimeOptionDate(vm.selectedTimeOption)[0];
            vm.datePickerModel.endDate = stationDataTimeOptions.getTimeOptionDate(vm.selectedTimeOption)[1];
        }
        
        function setSelectedTimeOption() {
            vm.selectedTimeOption = stationDataTimeOptions.getSelectedTimeOption();
        }
        
        function updateChartData() {
            if (vm.dataSourcesModel.selectedDataSource === 'Daily') {
                vm.updateDailyChartData();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'Hourly') {
                vm.updateHourlyChartData();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'High Frequency') {
                vm.updateHighFrequencyChartData();
            }

        }
        
        function updateDailyChartData() {
            
            var parameterUnit = vm.chartParameter.group.parameter_unit;
            vm.chartParameter.charts.stationsAverageChart.series = [];
            vm.setChartTitle('stationsAverageChart');
            vm.setChartSubtitle('stationsAverageChart');
            vm.getDailyChartData().then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var series = data[i];
                    series.tooltip = {
                        'headerFormat': '<span style="font-size: 10px">{point.key: %Y-%m-%d %H:%M:%S}</span><br/>',
                        'pointFormat': '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f} ' + parameterUnit + '</b><br/>'
                    };
                    vm.chartParameter.charts.stationsAverageChart.series.push(series);
                }
            });
        }
        
        function updateHighFrequencyChartData() {
            var parameterUnit = vm.chartParameter.group.parameter_unit;
            vm.chartParameter.charts.stationsAverageChart.series = [];
            vm.setChartTitle('stationsAverageChart');
            vm.setChartSubtitle('stationsAverageChart');
            vm.getHighFrequencyChartData().then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var series = data[i];
                    series.tooltip = {
                        'headerFormat': '<span style="font-size: 10px">{point.key: %Y-%m-%d %H:%M:%S}</span><br/>',
                        'pointFormat': '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f} ' + parameterUnit + '</b><br/>'
                    };
                    vm.chartParameter.charts.stationsAverageChart.series.push(series);
                }
            });
        }
        
        function updateHourlyChartData() {
            var parameterUnit = vm.chartParameter.group.parameter_unit;
            vm.chartParameter.charts.stationsAverageChart.series = [];
            vm.setChartTitle('stationsAverageChart');
            vm.setChartSubtitle('stationsAverageChart');
            vm.getHourlyChartData().then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var series = data[i];
                    series.tooltip = {
                        'headerFormat': '<span style="font-size: 10px">{point.key: %Y-%m-%d %H:%M:%S}</span><br/>',
                        'pointFormat': '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f} ' + parameterUnit + '</b><br/>'
                    };
                    vm.chartParameter.charts.stationsAverageChart.series.push(series);
                }
            });
        }
        
        $scope.$on('dataSourceChange', function() {
            vm.dataSourcesModel.selectedDataSource = stationDataSource.getSelectedDataSource();
            vm.updateChartData();
        });
        
        $scope.$on('datePickerChange', function() {
            vm.setSelectedTimeOption();
            vm.setDatePicker();
            vm.updateChartData();
        });
        
    }
    
})();
