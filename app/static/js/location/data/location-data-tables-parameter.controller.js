(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataTablesParameter', LocationDataTablesParameter);
    
    LocationDataTablesParameter.$inject = [
        '$filter',
        '$scope',        
        'locationMeasurements',
        'locationStorage',
        'locationDataSource', 
        'locationDataTimeOptions'
    ];
    
    function LocationDataTablesParameter($filter, $scope, locationMeasurements, locationStorage, locationDataSource, locationDataTimeOptions) {
        var vm = this;
        
        vm.getDailyStationsAverageData = getDailyStationsAverageData;
        vm.getHighFrequencyStationsAverageData = getHighFrequencyStationsAverageData;
        vm.getHourlyStationsAverageData = getHourlyStationsAverageData;
        vm.initTableParameter = initTableParameter;
        vm.location = locationStorage.getLocation();
        vm.setDatePicker = setDatePicker;
        vm.setSelectedTimeOption = setSelectedTimeOption;
        vm.tableParameter = {};
        vm.updateTableData = updateTableData;
        
        vm.selected = [];
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
        vm.setDatePicker();
        
        function getDailyStationsAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return locationMeasurements.getDailyStationsAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response;
                });
        }
        
        function getHighFrequencyStationsAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return locationMeasurements.getHighFrequencyStationsAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response;
                });
        }
        
        function getHourlyStationsAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.startDate.valueOf();
            var toDate = vm.datePickerModel.endDate.valueOf();
            return locationMeasurements.getHourlyStationsAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response;
                });
        }
        
        function initTableParameter(parameter) {
            console.log(parameter);
            vm.tableParameter.parameter = parameter;
            vm.getDailyStationsAverageData().then(function(data) {
                vm.measurements = data;
            });
        }
        
        function setDatePicker() {
            vm.datePickerModel.startDate = locationDataTimeOptions.getTimeOptionDate(vm.selectedTimeOption)[0];
            vm.datePickerModel.endDate = locationDataTimeOptions.getTimeOptionDate(vm.selectedTimeOption)[1];
        }
        
        function setSelectedTimeOption() {
            vm.selectedTimeOption = locationDataTimeOptions.getSelectedTimeOption();
        }
        
        function updateTableData() {
            //vm.tableParameter.tables.locationAverageTable.changeData();
            //vm.tableParameter.tables.stationsAverageTable.changeData();
        }
        
        $scope.$on('dataSourceChange', function() {
            vm.dataSourcesModel.selectedDataSource = locationDataSource.getSelectedDataSource();
            //vm.reInitTables();
        });
        
        $scope.$on('datePickerChange', function() {
            vm.setSelectedTimeOption();
            vm.setDatePicker();
            vm.updateTableData();
        });
        
    }
    
})();
