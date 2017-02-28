(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataTablesParameter', LocationDataTablesParameter);
    
    LocationDataTablesParameter.$inject = [
        '$scope',
        '$q',
        'DTOptionsBuilder', 
        'DTColumnBuilder',
        'locationMeasurements',
        'locationStorage',
        'locationDataSource', 
        'locationDatePicker', 
    ];
    
    function LocationDataTablesParameter($scope, $q, DTOptionsBuilder, DTColumnBuilder, locationMeasurements, locationStorage, locationDataSource, locationDatePicker) {
        var vm = this;
        
        vm.getDailyLocationAverageData = getDailyLocationAverageData;
        vm.getDailyStationsAverageData = getDailyStationsAverageData;
        vm.getHighFrequencyLocationAverageData = getHighFrequencyLocationAverageData;
        vm.getHighFrequencyStationsAverageData = getHighFrequencyStationsAverageData;
        vm.getHourlyLocationAverageData = getHourlyLocationAverageData;
        vm.getHourlyStationsAverageData = getHourlyStationsAverageData;
        vm.initTable = initTable;
        vm.initTableParameter = initTableParameter;
        vm.location = locationStorage.getLocation();
        vm.tableParameter = {};
        vm.updateTableData = updateTableData;
        vm.updateDailyLocationAverageData = updateDailyLocationAverageData;
        vm.updateDailyStationsAverageData = updateDailyStationsAverageData;
        vm.updateHighFrequencyLocationAverageData = updateHighFrequencyLocationAverageData;
        vm.updateHighFrequencyStationsAverageData = updateHighFrequencyStationsAverageData;
        vm.updateHourlyLocationAverageData = updateHourlyLocationAverageData;
        vm.updateHourlyStationsAverageData = updateHourlyStationsAverageData;
        
        vm.dataSourcesModel = {
            dataSources: locationDataSource.getDataSources(),
            selectedDataSource: locationDataSource.getSelectedDataSource()
        };
        
        vm.datePickerModel = {
            datePicker: {
                date: locationDatePicker.getDatePickerDate()
                    //{
                    //    startDate: moment().subtract(364, 'days'),
                    //    endDate: moment()
                    //}
            },
            datePickerOptions: locationDatePicker.getDatePickerOptions()
        };
        
        function getDailyLocationAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.tableParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getDailyAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response;
                });
        }
        
        function getDailyStationsAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getDailyStationsAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHighFrequencyLocationAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getHighFrequencyAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHighFrequencyStationsAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getHighFrequencyStationsAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyLocationAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getHourlyAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getHourlyStationsAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.chartParameter.parameter.parameter_id
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getHourlyStationsAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function initTableParameter(parameter) {
            vm.tableParameter.parameter = parameter;
            vm.tableParameter.tables = {
                locationAverageTable: {
                    dtOptions: null,
                    dtColumns: null
                },
                stationsAverageTable: {
                    dtOptions: null,
                    dtColumns: null
                }
            };
        }
        
        function initTable(table) {
            vm.updateTableData();
        }
        
        function updateDailyLocationAverageData() {
            vm.tableParameter.tables.locationAverageTable.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
                return vm.getDailyLocationAverageData();
            }).withDataProp('data').withPaginationType('full_numbers');
            vm.tableParameter.tables.locationAverageTable.dtColumns = [
                DTColumnBuilder.newColumn('location_id').withTitle('ID'),
                DTColumnBuilder.newColumn('parameter_id').withTitle('Parameter ID'),
                DTColumnBuilder.newColumn('qc_level').withTitle('QC Level'),
                DTColumnBuilder.newColumn('year').withTitle('Year'),
                DTColumnBuilder.newColumn('date').withTitle('Date'),
                DTColumnBuilder.newColumn('avg_value').withTitle('Avg Value'),
                DTColumnBuilder.newColumn('unit').withTitle('Unit')
            ];
        }
        
        function updateDailyStationsAverageData() {
            vm.getDailyStationsAverageData().then(function(data) {
            });
        }
        
        function updateHighFrequencyLocationAverageData() {
            vm.getHighFrequencyLocationAverageData().then(function(data) {
            });
        }
        
        function updateHighFrequencyStationsAverageData() {
            vm.getHighFrequencyStationsAverageData().then(function(data) {
            });
        }
        
        function updateHourlyLocationAverageData() {
            vm.getHourlyLocationAverageData().then(function(data) {
            });
        }
        
        function updateHourlyStationsAverageData() {
            vm.getHourlyStationsAverageData().then(function(data) {
            });
        }
        
        function updateTableData() {
            if (vm.dataSourcesModel.selectedDataSource === 'Daily') {
                vm.updateDailyLocationAverageData();
                //vm.updateDailyStationsAverageData();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'Hourly') {
                //vm.updateHourlyLocationAverageData();
                //vm.updateHourlyStationsAverageData();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'High Frequency') {
                //vm.updateHighFrequencyLocationAverageData();
                //vm.updateHighFrequencyStationsAverageData();
            }

        }
        
        $scope.$on('dataSourceChange', function() {
            vm.dataSourcesModel.selectedDataSource = locationDataSource.getSelectedDataSource();
            vm.updateTableData();
        });
        
        $scope.$on('datePickerChange', function() {
            vm.datePickerModel.datePicker.date = locationDatePicker.getDatePickerDate();
            vm.updateTableData();
        });
        
    }
    
})();
