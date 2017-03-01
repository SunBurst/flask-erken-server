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
        'locationDatePicker', 
        'HeatMapOptions'
    ];
    
    function LocationDataChartsProfile($scope, locationMeasurements, locationStorage, locationDataSource, locationDatePicker, HeatMapOptions) {
        var vm = this;
        
        vm.chartParameter = {};
        //vm.getHighFrequencyLocationAverageChartData = getHighFrequencyLocationAverageChartData;
        vm.getHighFrequencyStationsAverageChartData = getHighFrequencyStationsAverageChartData;
        vm.initChart = initChart;
        vm.initChartParameter = initChartParameter;
        vm.location = locationStorage.getLocation();
        vm.setChartSubtitle = setChartSubtitle;
        vm.setChartTitle = setChartTitle;
        vm.updateChartData = updateChartData;
        vm.updateHighFrequencyLocationAverageChartData = updateHighFrequencyLocationAverageChartData;
        vm.updateHighFrequencyStationsAverageChartData = updateHighFrequencyStationsAverageChartData;
        
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
        
        //vm.depthModel = {
        //    minDepth: 0.0,
        //    maxDepth: 15.0
        //};
        
        function getHighFrequencyLocationAverageChartData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getHighFrequencyChartAverageProfileMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHighFrequencyStationsAverageChartData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getHighFrequencyStationsChartAverageProfileMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function initChartParameter(parameter) {
            vm.chartParameter.parameter = parameter;
            vm.chartParameter.charts = {
                //locationAverageChart: angular.copy(HeatMapOptions),
                stationsAverageChart: angular.copy(HeatMapOptions)
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
        
        function updateHighFrequencyLocationAverageChartData() {
            vm.chartParameter.charts.locationAverageChart.series = [];
            vm.setChartTitle('locationAverageChart');
            vm.setChartSubtitle('locationAverageChart');
            vm.getHighFrequencyLocationAverageChartData().then(function(data) {
                var series = data;
                series.name = vm.location.location_name;
                vm.chartParameter.charts.locationAverageChart.series.push(series);
            });
        }
        
        function updateHighFrequencyStationsAverageChartData() {
            vm.chartParameter.charts.stationsAverageChart.series = [];
            vm.setChartTitle('stationsAverageChart');
            vm.setChartSubtitle('stationsAverageChart');
            vm.getHighFrequencyStationsAverageChartData().then(function(data) {
                vm.chartParameter.charts.stationsAverageChart.series = data;
            });
        }
        
        function updateChartData() {
            if (vm.dataSourcesModel.selectedDataSource === 'High Frequency') {
                //vm.updateHighFrequencyLocationAverageChartData();
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
