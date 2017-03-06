(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationStatusChartsParameter', LocationStatusChartsParameter);
    
    LocationStatusChartsParameter.$inject = [
        '$scope',
        'locationStatusMeasurements',
        'locationStorage',
        'locationDataSource', 
        'locationDatePicker', 
        'HighChartOptions'
    ];
    
    function LocationStatusChartsParameter($scope, locationStatusMeasurements, locationStorage, locationDataSource, locationDatePicker, HighChartOptions) {
        var vm = this;
        
        vm.chartParameter = {};
        vm.getDailyLocationAverageChartData = getDailyLocationAverageChartData;
        vm.getDailyStationsAverageChartData = getDailyStationsAverageChartData;
        vm.getHighFrequencyLocationAverageChartData = getHighFrequencyLocationAverageChartData;
        vm.getHighFrequencyStationsAverageChartData = getHighFrequencyStationsAverageChartData;
        vm.getHourlyLocationAverageChartData = getHourlyLocationAverageChartData;
        vm.getHourlyStationsAverageChartData = getHourlyStationsAverageChartData;
        vm.initChart = initChart;
        vm.initChartParameter = initChartParameter;
        vm.location = locationStorage.getLocation();
        vm.setChartSubtitle = setChartSubtitle;
        vm.setChartTitle = setChartTitle;
        vm.updateChartData = updateChartData;
        vm.updateDailyLocationAverageChartData = updateDailyLocationAverageChartData;
        vm.updateDailyStationsAverageChartData = updateDailyStationsAverageChartData;
        vm.updateHighFrequencyLocationAverageChartData = updateHighFrequencyLocationAverageChartData;
        vm.updateHighFrequencyStationsAverageChartData = updateHighFrequencyStationsAverageChartData;
        vm.updateHourlyLocationAverageChartData = updateHourlyLocationAverageChartData;
        vm.updateHourlyStationsAverageChartData = updateHourlyStationsAverageChartData;
        
        
        vm.dataSourcesModel = {
            dataSources: locationDataSource.getDataSources(),
            selectedDataSource: locationDataSource.getSelectedDataSource()
        };
        
        vm.datePickerModel = {
            datePicker: {
                date: locationDatePicker.getDatePickerDate()
            },
            datePickerOptions: locationDatePicker.getDatePickerOptions()
        };
        
        function getDailyLocationAverageChartData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationStatusMeasurements.getDailyChartAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getDailyStationsAverageChartData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationStatusMeasurements.getDailyStationsChartAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHighFrequencyLocationAverageChartData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationStatusMeasurements.getHighFrequencyChartAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHighFrequencyStationsAverageChartData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationStatusMeasurements.getHighFrequencyStationsChartAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyLocationAverageChartData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationStatusMeasurements.getHourlyChartAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyStationsAverageChartData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationStatusMeasurements.getHourlyStationsChartAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function initChartParameter(parameter) {
            vm.chartParameter.parameter = parameter;
            vm.chartParameter.charts = {
                locationAverageChart: angular.copy(HighChartOptions),
                stationsAverageChart: angular.copy(HighChartOptions)
            };
        }
        
        function initChart(chart) {
            vm.setChartSubtitle(chart);
            vm.setChartTitle(chart);
            vm.chartParameter.charts[chart].yAxis.title.text = vm.chartParameter.parameter.parameter_name + ' (' + vm.chartParameter.parameter.parameter_unit + ')';
            vm.updateChartData();
        }
        
        function setChartTitle(chart) {
            var selectedDataSource = vm.dataSourcesModel.selectedDataSource;
            var parameterName = vm.chartParameter.parameter.parameter_name;
            var locationName = vm.location.location_name;
            vm.chartParameter.charts[chart].title.text = selectedDataSource + ' Average ' + parameterName + ' at ' + locationName;
        }
        
        function setChartSubtitle(chart) {
            var fromDate = vm.datePickerModel.datePicker.date.startDate.format('YYYY-MM-DD HH:mm:ss');
            var toDate = vm.datePickerModel.datePicker.date.endDate.format('YYYY-MM-DD HH:mm:ss');
            vm.chartParameter.charts[chart].subtitle.text = fromDate + ' - ' + toDate;
        }
        
        function updateDailyLocationAverageChartData() {
            var parameterName = vm.chartParameter.parameter.parameter_name;
            var parameterUnit = vm.chartParameter.parameter.parameter_unit;
            vm.chartParameter.charts.locationAverageChart.series = [];
            vm.setChartTitle('locationAverageChart');
            vm.setChartSubtitle('locationAverageChart');
            vm.getDailyLocationAverageChartData().then(function(data) {
                var series = data;
                series.name = vm.location.location_name;
                series.tooltip = {
                    'headerFormat': '<span style="font-size: 10px">{point.key: %Y-%m-%d}</span><br/>',
                    'pointFormat': parameterName + ': <b>{point.y:.2f} ' + parameterUnit + '</br>'
                };
                vm.chartParameter.charts.locationAverageChart.series.push(series);
            });
        }
        
        function updateDailyStationsAverageChartData() {
            var parameterUnit = vm.chartParameter.parameter.parameter_unit;
            vm.chartParameter.charts.stationsAverageChart.series = [];
            vm.setChartTitle('stationsAverageChart');
            vm.setChartSubtitle('stationsAverageChart');
            vm.getDailyStationsAverageChartData().then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var series = data[i];
                    series.tooltip = {
                        'headerFormat': '<span style="font-size: 10px">{point.key: %Y-%m-%d}</span><br/>',
                        'pointFormat': '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f} ' + parameterUnit + '</b><br/>'
                    };
                    vm.chartParameter.charts.stationsAverageChart.series.push(series);
                }
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
                series.name = vm.location.location_name;
                series.tooltip = {
                    'headerFormat': '<span style="font-size: 10px">{point.key: %Y-%m-%d}</span><br/>',
                    'pointFormat': parameterName + ': <b>{point.y:.2f} ' + parameterUnit + '</br>'
                };
                vm.chartParameter.charts.locationAverageChart.series.push(series);
            });
        }
        
        function updateHighFrequencyStationsAverageChartData() {
            var parameterUnit = vm.chartParameter.parameter.parameter_unit;
            vm.chartParameter.charts.stationsAverageChart.series = [];
            vm.setChartTitle('stationsAverageChart');
            vm.setChartSubtitle('stationsAverageChart');
            vm.getHighFrequencyStationsAverageChartData().then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var series = data[i];
                    series.tooltip = {
                        'headerFormat': '<span style="font-size: 10px">{point.key: %Y-%m-%d}</span><br/>',
                        'pointFormat': '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f} ' + parameterUnit + '</b><br/>'
                    };
                    vm.chartParameter.charts.stationsAverageChart.series.push(series);
                }
            });
        }
        
        function updateHourlyLocationAverageChartData() {
            var parameterName = vm.chartParameter.parameter.parameter_name;
            var parameterUnit = vm.chartParameter.parameter.parameter_unit;
            vm.chartParameter.charts.locationAverageChart.series = [];
            vm.setChartTitle('locationAverageChart');
            vm.setChartSubtitle('locationAverageChart');
            vm.getHourlyLocationAverageChartData().then(function(data) {
                var series = data;
                series.name = vm.location.location_name;
                series.tooltip = {
                    'headerFormat': '<span style="font-size: 10px">{point.key: %Y-%m-%d}</span><br/>',
                    'pointFormat': parameterName + ': <b>{point.y:.2f} ' + parameterUnit + '</br>'
                };
                vm.chartParameter.charts.locationAverageChart.series.push(series);
            });
        }
        
        function updateHourlyStationsAverageChartData() {
            var parameterUnit = vm.chartParameter.parameter.parameter_unit;
            vm.chartParameter.charts.stationsAverageChart.series = [];
            vm.setChartTitle('stationsAverageChart');
            vm.setChartSubtitle('stationsAverageChart');
            vm.getHourlyStationsAverageChartData().then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    var series = data[i];
                    series.tooltip = {
                        'headerFormat': '<span style="font-size: 10px">{point.key: %Y-%m-%d}</span><br/>',
                        'pointFormat': '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f} ' + parameterUnit + '</b><br/>'
                    };
                    vm.chartParameter.charts.stationsAverageChart.series.push(series);
                }
            });
        }
        
        function updateChartData() {
            if (vm.dataSourcesModel.selectedDataSource === 'Daily') {
                vm.updateDailyLocationAverageChartData();
                vm.updateDailyStationsAverageChartData();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'Hourly') {
                vm.updateHourlyLocationAverageChartData();
                vm.updateHourlyStationsAverageChartData();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'High Frequency') {
                vm.updateHighFrequencyLocationAverageChartData();
                vm.updateHighFrequencyStationsAverageChartData();
            }

        }
        
        $scope.$on('dataSourceChange', function() {
            vm.dataSourcesModel.selectedDataSource = locationDataSource.getSelectedDataSource();
            vm.updateChartData();
        });
        
        $scope.$on('datePickerChange', function() {
            vm.datePickerModel.datePicker.date = locationDatePicker.getDatePickerDate();
            vm.updateChartData();
        });
        
    }
    
})();
