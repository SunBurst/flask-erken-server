(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataTablesParameter', LocationDataTablesParameter);
    
    LocationDataTablesParameter.$inject = [
        '$filter',
        '$scope',        
        'DTOptionsBuilder', 
        'DTColumnBuilder',
        'locationMeasurements',
        'locationStorage',
        'locationDataSource', 
        'locationDatePicker', 
    ];
    
    function LocationDataTablesParameter($filter, $scope, DTOptionsBuilder, DTColumnBuilder, locationMeasurements, locationStorage, locationDataSource, locationDatePicker) {
        var vm = this;
        
        vm.getDailyLocationAverageData = getDailyLocationAverageData;
        vm.getDailyStationsAverageData = getDailyStationsAverageData;
        vm.getDefaultLocationAverageTableProperties = getDefaultLocationAverageTableProperties;
        vm.getDefaultStationsAverageTableProperties = getDefaultStationsAverageTableProperties;
        vm.getHighFrequencyLocationAverageData = getHighFrequencyLocationAverageData;
        vm.getHighFrequencyStationsAverageData = getHighFrequencyStationsAverageData;
        vm.getHourlyLocationAverageData = getHourlyLocationAverageData;
        vm.getHourlyStationsAverageData = getHourlyStationsAverageData;
        vm.initDailyLocationAverageTable = initDailyLocationAverageTable;
        vm.initDailyStationsAverageTable = initDailyStationsAverageTable;
        vm.initHighFrequencyLocationAverageTable = initHighFrequencyLocationAverageTable;
        vm.initHighFrequencyStationsAverageTable = initHighFrequencyStationsAverageTable;
        vm.initHourlyLocationAverageTable = initHourlyLocationAverageTable;
        vm.initHourlyStationsAverageTable = initHourlyStationsAverageTable;
        vm.initLocationAverageTable = initLocationAverageTable;
        vm.initStationsAverageTable = initStationsAverageTable;
        vm.initTable = initTable;
        vm.initTableParameter = initTableParameter;
        vm.location = locationStorage.getLocation();
        vm.reInitTables = reInitTables;
        vm.tableParameter = {};
        vm.updateTableData = updateTableData;
        
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
        
        function getDailyLocationAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getDailyAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response;
                });
        }
        
        function getDailyStationsAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getDailyStationsAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response;
                });
        }
        
        function getHighFrequencyLocationAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getHighFrequencyAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response;
                });
        }
        
        function getHighFrequencyStationsAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getHighFrequencyStationsAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response;
                });
        }
        
        function getHourlyLocationAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getHourlyAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response;
                });
        }
        
        function getHourlyStationsAverageData() {
            var locationId = vm.location.location_id;
            var parameterId = vm.tableParameter.parameter.parameter_id;
            var fromDate = vm.datePickerModel.datePicker.date.startDate.valueOf();
            var toDate = vm.datePickerModel.datePicker.date.endDate.valueOf();
            return locationMeasurements.getHourlyStationsAverageParameterMeasurements(locationId, parameterId, 0, fromDate, toDate)
                .then(function(response) {
                    return response;
                });
        }
        
        function initTableParameter(parameter) {
            vm.tableParameter.parameter = parameter;
            vm.tableParameter.tables = {
                locationAverageTable: {
                    dtOptions: null,
                    dtColumns: null,
                    dtInstance: {},
                    changeData: null
                },
                stationsAverageTable: {
                    dtOptions: null,
                    dtColumns: null,
                    dtInstance: {},
                    changeData: null
                }
            };
        }
        
        function initDailyLocationAverageTable() {
            vm.tableParameter.tables.locationAverageTable.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
                return vm.getDailyLocationAverageData();
            }).withDataProp('data').withPaginationType('full_numbers');
            
            vm.tableParameter.tables.locationAverageTable.dtColumns = [
                DTColumnBuilder.newColumn('location_id').withTitle('ID').notVisible(),
                DTColumnBuilder.newColumn('date').withTitle('Date').renderWith(function(data, type, full, meta) {
                    return $filter('date')(data, 'yyyy-MM-dd HH:mm:ss');
                }),
                DTColumnBuilder.newColumn('parameter_id').withTitle('Parameter ID').notVisible(),
                DTColumnBuilder.newColumn('avg_value').withTitle(vm.tableParameter.parameter.parameter_name + ' (' + vm.tableParameter.parameter.parameter_unit + ')')
                    .renderWith(function(data, type, full, meta) {
                        return $filter('number')(data, 2);
                }),
                DTColumnBuilder.newColumn('unit').withTitle('Unit').notVisible(),
                DTColumnBuilder.newColumn('qc_level').withTitle('QC Level').notVisible(),
                DTColumnBuilder.newColumn('year').withTitle('Year').notVisible()
            ];
            
            vm.tableParameter.tables.locationAverageTable.dtInstance = {};
            vm.tableParameter.tables.locationAverageTable.changeData = changeData;
            
            function changeData() {
                vm.tableParameter.tables.locationAverageTable.dtInstance.changeData(function() {
                    return vm.getDailyLocationAverageData();
                });
            }
        }
        
        function initDailyStationsAverageTable() {
            vm.tableParameter.tables.stationsAverageTable.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
                return vm.getDailyStationsAverageData();
            }).withDataProp('data').withPaginationType('full_numbers');
            
            vm.tableParameter.tables.stationsAverageTable.dtColumns = [
                DTColumnBuilder.newColumn('location_id').withTitle('Location ID').notVisible(),
                DTColumnBuilder.newColumn('date').withTitle('Date').renderWith(function(data, type, full, meta) {
                    return $filter('date')(data, 'yyyy-MM-dd HH:mm:ss');
                }),
                DTColumnBuilder.newColumn('parameter_id').withTitle('Parameter ID').notVisible(),
                DTColumnBuilder.newColumn('station_name').withTitle('Station'),
                DTColumnBuilder.newColumn('avg_value').withTitle(vm.tableParameter.parameter.parameter_name + ' (' + vm.tableParameter.parameter.parameter_unit + ')')
                    .renderWith(function(data, type, full, meta) {
                        return $filter('number')(data, 2);
                }),
                DTColumnBuilder.newColumn('station_id').withTitle('Station ID').notVisible(),
                DTColumnBuilder.newColumn('unit').withTitle('Unit').notVisible(),
                DTColumnBuilder.newColumn('qc_level').withTitle('QC Level').notVisible(),
                DTColumnBuilder.newColumn('year').withTitle('Year').notVisible()
            ];
            
            vm.tableParameter.tables.stationsAverageTable.dtInstance = {};
            vm.tableParameter.tables.stationsAverageTable.changeData = changeData;
            
            function changeData() {
                vm.tableParameter.tables.stationsAverageTable.dtInstance.changeData(function() {
                    return vm.getDailyStationsAverageData();
                });
            }
        }
        
        function initHighFrequencyLocationAverageTable() {
            vm.tableParameter.tables.locationAverageTable.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
                return vm.getHighFrequencyLocationAverageData();
            }).withDataProp('data').withPaginationType('full_numbers');
            
            vm.tableParameter.tables.locationAverageTable.dtColumns = [
                DTColumnBuilder.newColumn('location_id').withTitle('ID').notVisible(),
                DTColumnBuilder.newColumn('timestamp').withTitle('Time').renderWith(function(data, type, full, meta) {
                    return $filter('date')(data, 'yyyy-MM-dd HH:mm:ss');
                }),
                DTColumnBuilder.newColumn('parameter_id').withTitle('Parameter ID').notVisible(),
                DTColumnBuilder.newColumn('avg_value').withTitle(vm.tableParameter.parameter.parameter_name + ' (' + vm.tableParameter.parameter.parameter_unit + ')')
                    .renderWith(function(data, type, full, meta) {
                        return $filter('number')(data, 2);
                }),
                DTColumnBuilder.newColumn('unit').withTitle('Unit').notVisible(),
                DTColumnBuilder.newColumn('qc_level').withTitle('QC Level').notVisible(),
                DTColumnBuilder.newColumn('month_first_day').withTitle('Month First Day').notVisible()
            ];
            
            vm.tableParameter.tables.locationAverageTable.dtInstance = {};
            vm.tableParameter.tables.locationAverageTable.changeData = changeData;
            
            function changeData() {
                vm.tableParameter.tables.locationAverageTable.dtInstance.changeData(function() {
                    return vm.getHighFrequencyLocationAverageData();
                });
            }
        }
        
        function initHighFrequencyStationsAverageTable() {
            vm.tableParameter.tables.stationsAverageTable.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
                return vm.getHighFrequencyStationsAverageData();
            }).withDataProp('data').withPaginationType('full_numbers');
            
            vm.tableParameter.tables.stationsAverageTable.dtColumns = [
                DTColumnBuilder.newColumn('location_id').withTitle('Location ID').notVisible(),
                DTColumnBuilder.newColumn('timestamp').withTitle('Time').renderWith(function(data, type, full, meta) {
                    return $filter('date')(data, 'yyyy-MM-dd HH:mm:ss');
                }),
                DTColumnBuilder.newColumn('parameter_id').withTitle('Parameter ID').notVisible(),
                DTColumnBuilder.newColumn('station_name').withTitle('Station'),
                DTColumnBuilder.newColumn('value').withTitle(vm.tableParameter.parameter.parameter_name + ' (' + vm.tableParameter.parameter.parameter_unit + ')')
                    .renderWith(function(data, type, full, meta) {
                        return $filter('number')(data, 2);
                }),
                DTColumnBuilder.newColumn('month_first_day').withTitle('Month First Day').notVisible(),
                DTColumnBuilder.newColumn('station_id').withTitle('Station ID').notVisible(),
                DTColumnBuilder.newColumn('unit').withTitle('Unit').notVisible(),
                DTColumnBuilder.newColumn('qc_level').withTitle('QC Level').notVisible(),
            ];
            
            vm.tableParameter.tables.stationsAverageTable.dtInstance = {};
            vm.tableParameter.tables.stationsAverageTable.changeData = changeData;
            
            function changeData() {
                vm.tableParameter.tables.stationsAverageTable.dtInstance.changeData(function() {
                    return vm.getHighFrequencyStationsAverageData();
                });
            }
        }
        
        function initHourlyLocationAverageTable() {
            vm.tableParameter.tables.locationAverageTable.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
                return vm.getHourlyLocationAverageData();
            }).withDataProp('data').withPaginationType('full_numbers');
            
            vm.tableParameter.tables.locationAverageTable.dtColumns = [
                DTColumnBuilder.newColumn('location_id').withTitle('ID').notVisible(),
                DTColumnBuilder.newColumn('date_hour').withTitle('Time').renderWith(function(data, type, full, meta) {
                    return $filter('date')(data, 'yyyy-MM-dd HH:mm:ss');
                }),
                DTColumnBuilder.newColumn('parameter_id').withTitle('Parameter ID').notVisible(),
                DTColumnBuilder.newColumn('avg_value').withTitle(vm.tableParameter.parameter.parameter_name + ' (' + vm.tableParameter.parameter.parameter_unit + ')')
                    .renderWith(function(data, type, full, meta) {
                        return $filter('number')(data, 2);
                }),
                DTColumnBuilder.newColumn('unit').withTitle('Unit').notVisible(),
                DTColumnBuilder.newColumn('qc_level').withTitle('QC Level').notVisible(),
                DTColumnBuilder.newColumn('year').withTitle('Year').notVisible()
            ];
            
            vm.tableParameter.tables.locationAverageTable.dtInstance = {};
            vm.tableParameter.tables.locationAverageTable.changeData = changeData;
            
            function changeData() {
                vm.tableParameter.tables.locationAverageTable.dtInstance.changeData(function() {
                    return vm.getHourlyLocationAverageData();
                });
            }
        }
        
        function initHourlyStationsAverageTable() {
            vm.tableParameter.tables.stationsAverageTable.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
                return vm.getHourlyStationsAverageData();
            }).withDataProp('data').withPaginationType('full_numbers');
            
            vm.tableParameter.tables.stationsAverageTable.dtColumns = [
                DTColumnBuilder.newColumn('location_id').withTitle('Location ID').notVisible(),
                DTColumnBuilder.newColumn('date_hour').withTitle('Time').renderWith(function(data, type, full, meta) {
                    return $filter('date')(data, 'yyyy-MM-dd HH:mm:ss');
                }),
                DTColumnBuilder.newColumn('parameter_id').withTitle('Parameter ID').notVisible(),
                DTColumnBuilder.newColumn('station_name').withTitle('Station'),
                DTColumnBuilder.newColumn('avg_value').withTitle(vm.tableParameter.parameter.parameter_name + ' (' + vm.tableParameter.parameter.parameter_unit + ')')
                    .renderWith(function(data, type, full, meta) {
                        return $filter('number')(data, 2);
                }),
                DTColumnBuilder.newColumn('year').withTitle('Year').notVisible(),
                DTColumnBuilder.newColumn('station_id').withTitle('Station ID').notVisible(),
                DTColumnBuilder.newColumn('unit').withTitle('Unit').notVisible(),
                DTColumnBuilder.newColumn('qc_level').withTitle('QC Level').notVisible(),
            ];
            
            vm.tableParameter.tables.stationsAverageTable.dtInstance = {};
            vm.tableParameter.tables.stationsAverageTable.changeData = changeData;
            
            function changeData() {
                vm.tableParameter.tables.stationsAverageTable.dtInstance.changeData(function() {
                    return vm.getHourlyStationsAverageData();
                });
            }
        }
        
        function initLocationAverageTable() {
            if (vm.dataSourcesModel.selectedDataSource === 'Daily') {
                vm.initDailyLocationAverageTable();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'Hourly') {
                vm.initHourlyLocationAverageTable();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'High Frequency') {
                vm.initHighFrequencyLocationAverageTable();
            }
        }
        
        function initStationsAverageTable() {
            if (vm.dataSourcesModel.selectedDataSource === 'Daily') {
                vm.initDailyStationsAverageTable();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'Hourly') {
                vm.initHourlyStationsAverageTable();
            }
            else if (vm.dataSourcesModel.selectedDataSource === 'High Frequency') {
                vm.initHighFrequencyStationsAverageTable();
            }
        }
        
        function initTable(table) {
            if (table === 'locationAverageTable') {
                vm.initLocationAverageTable();
            }
            else if (table === 'stationsAverageTable') {
                vm.initStationsAverageTable();
            }
        }
        
        function reInitTables() {
            vm.tableParameter.tables.locationAverageTable = vm.getDefaultLocationAverageTableProperties();
            vm.tableParameter.tables.stationsAverageTable = vm.getDefaultStationsAverageTableProperties();
            vm.initLocationAverageTable();
            vm.initStationsAverageTable();
        }
        
        function getDefaultLocationAverageTableProperties() {
             return {
                dtOptions: null,
                dtColumns: null,
                dtInstance: {},
                changeData: null
            };
        }
        
        function getDefaultStationsAverageTableProperties() {
             return {
                dtOptions: null,
                dtColumns: null,
                dtInstance: {},
                changeData: null
            };
        }
        
        function updateTableData() {
            vm.tableParameter.tables.locationAverageTable.changeData();
            vm.tableParameter.tables.stationsAverageTable.changeData();
        }
        
        $scope.$on('dataSourceChange', function() {
            vm.dataSourcesModel.selectedDataSource = locationDataSource.getSelectedDataSource();
            vm.reInitTables();
        });
        
        $scope.$on('datePickerChange', function() {
            vm.datePickerModel.datePicker.date = locationDatePicker.getDatePickerDate();
            vm.updateTableData();
        });
        
    }
    
})();
