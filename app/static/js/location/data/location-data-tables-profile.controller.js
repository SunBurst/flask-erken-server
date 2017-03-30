(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataTablesProfile', LocationDataTablesProfile);
    
    LocationDataTablesProfile.$inject = [
        '$filter',
        '$scope',        
        'DataTableParameterOptions',
        'locationMeasurements',
        'locationStorage',
        'locationDataSource', 
        'locationDataTimeOptions'
    ];
    
    function LocationDataTablesProfile($filter, $scope, DataTableParameterOptions, locationMeasurements, locationStorage, locationDataSource, locationDataTimeOptions) {
        var vm = this;
        
        vm.getDailyStationsAverageData = getDailyStationsAverageData;
        vm.getHighFrequencyStationsAverageData = getHighFrequencyStationsAverageData;
        vm.getHourlyStationsAverageData = getHourlyStationsAverageData;
        vm.initTableParameter = initTableParameter;
        vm.initTables = initTables;
        vm.limitOptions = [5, 10, 15];
        vm.location = locationStorage.getLocation();
        vm.dataTableOptions = {};
        vm.query = {};
        vm.setDataTableOptions = setDataTableOptions;
        vm.setDatePicker = setDatePicker;
        vm.setSelectedTimeOption = setSelectedTimeOption;
        vm.tableParameter = {};
        vm.updateDailyStationsAverageData = updateDailyStationsAverageData;
        vm.updateHourlyStationsAverageData = updateHourlyStationsAverageData;
        vm.updateHighFrequencyStationsAverageData = updateHighFrequencyStationsAverageData;
        
        vm.options = {
            decapitate: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };
        
        vm.measurements = [];
        
        vm.dataSourcesModel = {
            dataSources: locationDataSource.getDataSources(),
            selectedDataSource: locationDataSource.getSelectedDataSource()
        };
        
        vm.selectedTimeOption = null;
        
        vm.datePickerModel = {
            startDate: null,
            endDate: null
        };
        
        vm.setSelectedTimeOption();
        vm.setDataTableOptions();
        vm.setDatePicker();
        
        function getDailyStationsAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return locationMeasurements.getDailyStationsAverageProfileMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHighFrequencyStationsAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return locationMeasurements.getHighFrequencyStationsAverageProfileMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyStationsAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return locationMeasurements.getHourlyStationsAverageProfileMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function initTableParameter(parameter) {
            vm.tableParameter.parameter = parameter;
            vm.initTables();
        }
        
        function setDataTableOptions() {
            vm.dataTableOptions = DataTableParameterOptions(vm.dataSourcesModel.selectedDataSource);
            vm.query = vm.dataTableOptions.query;
        }
        
        function setDatePicker() {
            vm.datePickerModel.startDate = locationDataTimeOptions.getTimeOptionDate(vm.selectedTimeOption)[0];
            vm.datePickerModel.endDate = locationDataTimeOptions.getTimeOptionDate(vm.selectedTimeOption)[1];
        }
        
        function setSelectedTimeOption() {
            vm.selectedTimeOption = locationDataTimeOptions.getSelectedTimeOption();
        }
        
        function initTables() {
            if (vm.dataSourcesModel.selectedDataSource === 'Daily') {
                vm.updateDailyStationsAverageData();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'Hourly') {
                vm.updateHourlyStationsAverageData();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'High Frequency') {
                vm.updateHighFrequencyStationsAverageData();
            }
        }
        
        function updateDailyStationsAverageData() {
            vm.getDailyStationsAverageData().then(function(data) {
                vm.measurements = data;
            });
        }
        
        function updateHourlyStationsAverageData() {
            vm.getHourlyStationsAverageData().then(function(data) {
                vm.measurements = data;
            });
        }
        
        function updateHighFrequencyStationsAverageData() {
            vm.getHighFrequencyStationsAverageData().then(function(data) {
                vm.measurements = data;
            });
        }
        
        $scope.$on('dataSourceChange', function() {
            vm.dataSourcesModel.selectedDataSource = locationDataSource.getSelectedDataSource();
            vm.initTables();
        });
        
        $scope.$on('datePickerChange', function() {
            vm.setSelectedTimeOption();
            vm.setDatePicker();
            vm.initTables();
        });
        
    }
    
})();
