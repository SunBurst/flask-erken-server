(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDataChartsProfile', StationDataChartsProfile);
    
    StationDataChartsProfile.$inject = [
        '$scope',
        'stationMeasurements',
        'stationStorage',
        'stationDataSource', 
        'stationDataTimeOptions',
        'HeatMapOptions'
    ];
    
    function StationDataChartsProfile($scope, stationMeasurements, stationStorage, stationDataSource, stationDataTimeOptions, HeatMapOptions) {
        var vm = this;
        
        vm.chartParameter = {};
        vm.getDailyChartData = getDailyChartData;
        vm.getHourlyChartData = getHourlyChartData;
        vm.getHighFrequencyChartData = getHighFrequencyChartData;
        vm.initChart = initChart;
        vm.initChartParameter = initChartParameter;
        vm.station = stationStorage.getStation();
        vm.setChartSubtitle = setChartSubtitle;
        vm.setChartTitle = setChartTitle;
        vm.setDatePicker = setDatePicker;
        vm.setSelectedTimeOption = setSelectedTimeOption;
        vm.updateChartData = updateChartData;
        vm.updateDailyChartData = updateDailyChartData;
        vm.updateHourlyChartData = updateHourlyChartData;
        vm.updateHighFrequencyChartData = updateHighFrequencyChartData;
        
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
        
        //vm.depthModel = {
        //    minDepth: 0.0,
        //    maxDepth: 15.0
        //};
        
        function getDailyChartData() {
            var stationId = vm.station.station_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return stationMeasurements.getDailyProfileMeasurements(stationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyChartData() {
            var stationId = vm.station.station_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return stationMeasurements.getHourlyChartProfileMeasurements(stationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHighFrequencyChartData() {
            var stationId = vm.station.station_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return stationMeasurements.getHighFrequencyProfileMeasurements(stationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function initChartParameter(parameter) {
            vm.chartParameter.parameter = parameter;
            vm.chartParameter.charts = {
                stationAverageChart: angular.copy(HeatMapOptions)
            };
        }
        
        function initChart(chart) {
            vm.setChartSubtitle(chart);
            vm.setChartTitle(chart);
            vm.chartParameter.charts[chart].yAxis.title.text = 'Depth (m)';
            vm.updateChartData();
        }
        
        function setChartTitle(chart) {
            var selectedDataSource = vm.dataSourcesModel.selectedDataSource;
            var parameterName = vm.chartParameter.parameter.parameter_name;
            var stationName = vm.station.station_name;
            vm.chartParameter.charts[chart].title.text = selectedDataSource + ' Average ' + parameterName + ' at ' + stationName;
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
        
        function updateDailyChartData() {
            var parameterName = vm.chartParameter.parameter.parameter_name;
            var parameterUnit = vm.chartParameter.parameter.parameter_unit;
            vm.chartParameter.charts.stationAverageChart.series = [];
            vm.setChartTitle('stationAverageChart');
            vm.setChartSubtitle('stationAverageChart');
            vm.getDailyChartData().then(function(data) {
                var series = data;
                series.colsize = 24 * 36e5;
                series.name = vm.station.station_name;
                series.tooltip = {
                    'headerFormat': '',
                    'pointFormat': '{point.x: %Y-%m-%d}<br> {point.y:.1f} m <br>' + parameterName + ': <b>{point.value:.2f} ' + parameterUnit + '</br>'
                };
                vm.chartParameter.charts.stationAverageChart.series.push(series);
            });
        }
        
        function updateHourlyChartData() {
            var parameterName = vm.chartParameter.parameter.parameter_name;
            var parameterUnit = vm.chartParameter.parameter.parameter_unit;
            vm.chartParameter.charts.stationAverageChart.series = [];
            vm.setChartTitle('stationAverageChart');
            vm.setChartSubtitle('stationAverageChart');
            vm.getHourlyChartData().then(function(data) {
                vm.chartParameter.charts.stationAverageChart.series = [];
                var series = data[0];
                series.colsize = 1 * 36e5;
                series.turboThreshold = 100000;
                series.name = vm.station.station_name;
                series.tooltip = {
                    'headerFormat': '',
                    'pointFormat': '{point.x: %Y-%m-%d}<br> {point.y:.1f} m <br>' + parameterName + ': <b>{point.value:.2f} ' + parameterUnit + '</br>'
                };
                vm.chartParameter.charts.stationAverageChart.series.push(series);
            });
        }
        
        function updateHighFrequencyChartData() {
            var parameterName = vm.chartParameter.parameter.parameter_name;
            var parameterUnit = vm.chartParameter.parameter.parameter_unit;
            vm.chartParameter.charts.stationAverageChart.series = [];
            vm.setChartTitle('stationAverageChart');
            vm.setChartSubtitle('stationAverageChart');
            vm.getHighFrequencyChartData().then(function(data) {
                var series = data;
                series.colsize = (1 * 36e5)/4;
                series.name = vm.station.station_name;
                series.tooltip = {
                    'headerFormat': '',
                    'pointFormat': '{point.x: %Y-%m-%d}<br> {point.y:.1f} m <br>' + parameterName + ': <b>{point.value:.2f} ' + parameterUnit + '</br>'
                };
                vm.chartParameter.charts.stationAverageChart.series.push(series);
            });
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
