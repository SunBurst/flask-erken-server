(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDataTablesProfileCtrl', StationDataTablesProfileCtrl);
    
    StationDataTablesProfileCtrl.$inject = [
        '$filter',
        '$scope',        
        'DataTableParameterOptions',
        'stationMeasurements',
        'stationStorage',
        'stationDataSource', 
        'stationDataTimeOptions'
    ];
    
    function StationDataTablesProfileCtrl($filter, $scope, DataTableParameterOptions, stationMeasurements, stationStorage, stationDataSource, stationDataTimeOptions) {
        var vm = this;
        
        vm.getDailyData = getDailyData;
        vm.getHighFrequencyData = getHighFrequencyData;
        vm.getHourlyData = getHourlyData;
        vm.initTableParameter = initTableParameter;
        vm.initTables = initTables;
        vm.limitOptions = [5, 10, 15];
        vm.station = stationStorage.getStation();
        vm.dataTableOptions = {};
        vm.query = {};
        vm.setDataTableOptions = setDataTableOptions;
        vm.setDatePicker = setDatePicker;
        vm.setSelectedTimeOption = setSelectedTimeOption;
        vm.tableParameter = {};
        vm.updateDailyData = updateDailyData;
        vm.updateHourlyData = updateHourlyData;
        vm.updateHighFrequencyData = updateHighFrequencyData;
        
        vm.options = {
            decapitate: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };
        
        vm.measurements = [];
        
        vm.dataSourcesModel = {
            dataSources: stationDataSource.getDataSources(),
            selectedDataSource: stationDataSource.getSelectedDataSource()
        };
        
        vm.selectedTimeOption = null;
        
        vm.datePickerModel = {
            startDate: null,
            endDate: null
        };
        
        vm.setSelectedTimeOption();
        vm.setDataTableOptions();
        vm.setDatePicker();
        
        function getDailyData() {
            var stationId = vm.station.id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return stationMeasurements.getDailyProfileMeasurements(stationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHighFrequencyData() {
            var stationId = vm.station.id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return stationMeasurements.getHighFrequencyProfileMeasurements(stationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyData() {
            var stationId = vm.station.id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return stationMeasurements.getHourlyProfileMeasurements(stationId, parameterId, 0, fromDate, toDate)
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
            vm.datePickerModel.startDate = stationDataTimeOptions.getTimeOptionDate(vm.selectedTimeOption)[0];
            vm.datePickerModel.endDate = stationDataTimeOptions.getTimeOptionDate(vm.selectedTimeOption)[1];
        }
        
        function setSelectedTimeOption() {
            vm.selectedTimeOption = stationDataTimeOptions.getSelectedTimeOption();
        }
        
        function initTables() {
            if (vm.dataSourcesModel.selectedDataSource === 'Daily') {
                vm.updateDailyData();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'Hourly') {
                vm.updateHourlyData();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'High Frequency') {
                vm.updateHighFrequencyData();
            }
        }
        
        function updateDailyData() {
            vm.getDailyData().then(function(data) {
                vm.measurements = data;
            });
        }
        
        function updateHourlyData() {
            vm.getHourlyData().then(function(data) {
                vm.measurements = data;
            });
        }
        
        function updateHighFrequencyData() {
            vm.getHighFrequencyData().then(function(data) {
                vm.measurements = data;
            });
        }
        
        $scope.$on('dataSourceChange', function() {
            vm.dataSourcesModel.selectedDataSource = stationDataSource.getSelectedDataSource();
            vm.initTables();
        });
        
        $scope.$on('datePickerChange', function() {
            vm.setSelectedTimeOption();
            vm.setDatePicker();
            vm.initTables();
        });
        
    }
    
})();
