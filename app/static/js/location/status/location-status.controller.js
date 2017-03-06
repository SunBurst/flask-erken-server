(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationStatus', LocationStatus);
        
    LocationStatus.$inject = [
        '$scope',
        '$state',
        '$timeout',
        'resolvedStatusParameters',
        'resolvedStatusParameterSelection',
        'locationDataSource',
        'locationDatePicker',
        'locationStatusStorage',
        'locationStorage'
    ];
        
    function LocationStatus($scope, $state, $timeout, resolvedStatusParameters, resolvedStatusParameterSelection, locationDataSource, locationDatePicker, locationStatusStorage, locationStorage) {
        var vm = this;

        vm.changeSelection = changeSelection;
        vm.statusParameterList = resolvedStatusParameters;
        vm.statusParameters = locationStorage.getStatusParameters();
        vm.statusParameterSelection = resolvedStatusParameterSelection;
        
        vm.changeDataSource = changeDataSource;
        vm.changeSelection = changeSelection;
        vm.datePickerMasterModel = {
            datePicker: {
                date: {
                    startDate: null,
                    endDate: null
                }
            },
            datePickerOptions: null
        };
        vm.setSelectedDataSource = setSelectedDataSource;
        
        vm.dataSourcesModel = {
            dataSources: locationDataSource.getDataSources(),
            selectedDataSource: locationDataSource.getSelectedDataSource()
        };
        
        vm.datePickerMasterModel.datePicker.date.startDate = locationDatePicker.getDatePickerDate().startDate;
        vm.datePickerMasterModel.datePicker.date.endDate = locationDatePicker.getDatePickerDate().endDate;
        vm.datePickerMasterModel.datePickerOptions = locationDatePicker.getDatePickerOptions();
        
        function changeDataSource() {
            vm.setSelectedDataSource();
            $scope.$broadcast('dataSourceChange');
        }
        
        function changeSelection(parameterId, newValue) {
            locationStatusStorage.setStatusParameterSelectedValue(parameterId, newValue);
            $scope.$broadcast('parameterSelectionChange');
        }
        
        function setSelectedDataSource() {
            locationDataSource.setSelectedDataSource(vm.dataSourcesModel.selectedDataSource);
        }
        
        $timeout(function() {
            if ($state.current.name === 'location.status') {
                $state.go('location.status.charts');
            }
        }, 100);
        
        $scope.$watch(function() {
            return vm.datePickerMasterModel.datePicker.date;
        }, function (newDate, oldDate) {
            var done = locationDatePicker.setDatePickerDate(vm.datePickerMasterModel.datePicker.date);
            $scope.$broadcast('datePickerChange');
        });
        
    }
        
})();
