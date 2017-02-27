(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationData', LocationData);
        
    LocationData.$inject = [
        '$scope',
        '$state',
        '$timeout',
        'resolvedParameters',
        'resolvedParameterSelection',
        'locationStorage',
        'locationDataSource',
        'locationDataStorage',
        'locationDatePicker'
    ];
        
    function LocationData($scope, $state, $timeout, resolvedParameters, resolvedParameterSelection, locationStorage, locationDataSource, locationDataStorage, locationDatePicker) {
        var vm = this;

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
        vm.isParameterType = isParameterType;
        vm.parameterList = resolvedParameters;
        vm.parameters = locationStorage.getParameters();
        vm.parameterSelection = resolvedParameterSelection;
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
            locationDataStorage.setParameterSelectedValue(parameterId, newValue);
            $scope.$broadcast('parameterSelectionChange');
        }
        
        function isParameterType(parameterType, isOfType) {
            return parameterType === isOfType;
        }
        
        function setSelectedDataSource() {
            locationDataSource.setSelectedDataSource(vm.dataSourcesModel.selectedDataSource);
        }

        $timeout(function() {
            if ($state.current.name === 'location.data') {
                $state.go('location.data.charts');
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
