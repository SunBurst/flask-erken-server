(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataChartsProfile', LocationDataChartsProfile);
    
    LocationDataChartsProfile.$inject = [
        '$scope',
        'locationMeasurements',
        'locationStorage',
        'locationDataSource', 
        'locationDataTimeOptions',
        'HeatMapOptions'
    ];
    
    function LocationDataChartsProfile($scope, locationMeasurements, locationStorage, locationDataSource, locationDataTimeOptions, HeatMapOptions) {
        var vm = this;
        
        vm.chartParameter = {};
        vm.getDailyLocationAverageChartData = getDailyLocationAverageChartData;
        vm.getHourlyLocationAverageChartData = getHourlyLocationAverageChartData;
        vm.getHighFrequencyLocationAverageChartData = getHighFrequencyLocationAverageChartData;
        vm.initChart = initChart;
        vm.initChartParameter = initChartParameter;
        vm.location = locationStorage.getLocation();
        vm.setChartSubtitle = setChartSubtitle;
        vm.setChartTitle = setChartTitle;
        vm.setDatePicker = setDatePicker;
        vm.setSelectedTimeOption = setSelectedTimeOption;
        vm.updateChartData = updateChartData;
        vm.updateDailyLocationAverageChartData = updateDailyLocationAverageChartData;
        vm.updateHourlyLocationAverageChartData = updateHourlyLocationAverageChartData;
        vm.updateHighFrequencyLocationAverageChartData = updateHighFrequencyLocationAverageChartData;
        
        vm.dataSourcesModel = {
            dataSources: locationDataSource.getDataSources(),
            selectedDataSource: locationDataSource.getSelectedDataSource()
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
        
        function getDailyLocationAverageChartData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return locationMeasurements.getDailyStationsAverageProfileMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyLocationAverageChartData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return locationMeasurements.getHourlyStationsChartAverageProfileMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHighFrequencyLocationAverageChartData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return locationMeasurements.getHighFrequencyStationsAverageProfileMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function initChartParameter(parameter) {
            vm.chartParameter.parameter = parameter;
            vm.chartParameter.charts = {
                locationAverageChart: angular.copy(HeatMapOptions)
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
            var locationName = vm.location.location_name;
            vm.chartParameter.charts[chart].title.text = selectedDataSource + ' Average ' + parameterName + ' at ' + locationName;
        }
        
        function setChartSubtitle(chart) {
            var fromDate = vm.datePickerModel.startDate.format('YYYY-MM-DD HH:mm:ss');
            var toDate = vm.datePickerModel.endDate.format('YYYY-MM-DD HH:mm:ss');
            vm.chartParameter.charts[chart].subtitle.text = fromDate + ' - ' + toDate;
        }
        
        function setDatePicker() {
            vm.datePickerModel.startDate = locationDataTimeOptions.getTimeOptionDate(vm.selectedTimeOption)[0];
            vm.datePickerModel.endDate = locationDataTimeOptions.getTimeOptionDate(vm.selectedTimeOption)[1];
        }
        
        function setSelectedTimeOption() {
            vm.selectedTimeOption = locationDataTimeOptions.getSelectedTimeOption();
        }
        
        function updateDailyLocationAverageChartData() {
            var parameterName = vm.chartParameter.parameter.parameter_name;
            var parameterUnit = vm.chartParameter.parameter.parameter_unit;
            vm.chartParameter.charts.locationAverageChart.series = [];
            vm.setChartTitle('locationAverageChart');
            vm.setChartSubtitle('locationAverageChart');
            vm.getDailyLocationAverageChartData().then(function(data) {
                var series = data;
                series.colsize = 24 * 36e5;
                series.name = vm.location.location_name;
                series.tooltip = {
                    'headerFormat': '',
                    'pointFormat': '{point.x: %Y-%m-%d}<br> {point.y:.1f} m <br>' + parameterName + ': <b>{point.value:.2f} ' + parameterUnit + '</br>'
                };
                vm.chartParameter.charts.locationAverageChart.series.push(series);
            });
        }
        
        function updateHourlyLocationAverageChartData() {
            var parameterName = vm.chartParameter.parameter.parameter_name;
            var parameterUnit = vm.chartParameter.parameter.parameter_unit;
            vm.chartParameter.charts.locationAverageChart.series = [];
            vm.setChartTitle('locationAverageChart');
            vm.setChartSubtitle('locationAverageChart');
            vm.getHourlyLocationAverageChartData().then(function(data) {
                vm.chartParameter.charts.locationAverageChart.series = [];
                var series = data[0];
                series.colsize = 1 * 36e5;
                series.turboThreshold = 100000;
                series.name = vm.location.location_name;
                series.tooltip = {
                    'headerFormat': '',
                    'pointFormat': '{point.x: %Y-%m-%d}<br> {point.y:.1f} m <br>' + parameterName + ': <b>{point.value:.2f} ' + parameterUnit + '</br>'
                };
                vm.chartParameter.charts.locationAverageChart.series.push(series);
            });
        }
        
        function updateHighFrequencyLocationAverageChartData() {
            var parameterName = vm.chartParameter.parameter.parameter_name;
            var parameterUnit = vm.chartParameter.parameter.parameter_unit;
            vm.chartParameter.charts.locationAverageChart.series = [];
            vm.setChartTitle('locationAverageChart');
            vm.setChartSubtitle('locationAverageChart');
            vm.getHighFrequencyLocationAverageChartData().then(function(data) {
                var series = data;
                series.colsize = (1 * 36e5)/4;
                series.name = vm.location.location_name;
                series.tooltip = {
                    'headerFormat': '',
                    'pointFormat': '{point.x: %Y-%m-%d}<br> {point.y:.1f} m <br>' + parameterName + ': <b>{point.value:.2f} ' + parameterUnit + '</br>'
                };
                vm.chartParameter.charts.locationAverageChart.series.push(series);
            });
        }
        
        function updateChartData() {
            if (vm.dataSourcesModel.selectedDataSource === 'Daily') {
                vm.updateDailyLocationAverageChartData();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'Hourly') {
                vm.updateHourlyLocationAverageChartData();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'High Frequency') {
                vm.updateHighFrequencyLocationAverageChartData();
            }

        }
        
        $scope.$on('dataSourceChange', function() {
            vm.dataSourcesModel.selectedDataSource = locationDataSource.getSelectedDataSource();
            vm.updateChartData();
        });
        
        $scope.$on('datePickerChange', function() {
            vm.setSelectedTimeOption();
            vm.setDatePicker();
            vm.updateChartData();
        });
        
    }
    
})();
