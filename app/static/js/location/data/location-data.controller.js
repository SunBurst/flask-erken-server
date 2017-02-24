(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationData', LocationData);
        
    LocationData.$inject = [
        '$scope',
        'resolvedParameters',
        'resolvedParameterSelection',
        'locationStorage',
        'locationDataSource',
        'locationDatePicker'
    ];
        
    function LocationData($scope, resolvedParameters, resolvedParameterSelection, locationStorage, locationDataSource, locationDatePicker) {
        var vm = this;

        vm.changeDataSource = changeDataSource;
        vm.changeSelection = changeSelection;
        vm.isParameterType = isParameterType;
        vm.parameterList = resolvedParameters;
        vm.parameters = locationStorage.getParameters();
        vm.parameterSelection = resolvedParameterSelection;
        vm.setSelectedDataSource = setSelectedDataSource;
        
        vm.dataSourcesModel = {
            dataSources: locationDataSource.getDataSources(),
            selectedDataSource: locationDataSource.getSelectedDataSource()
        };
        
        vm.datePickerModel = {
            datePicker: locationDatePicker.getDatePicker(),
            datePickerOptions: locationDatePicker.getDatePickerOptions()
        };
        
        function changeDataSource() {
            vm.setSelectedDataSource();
            $scope.$broadcast('dataSourceChange');
        }
        
        function changeSelection(parameter) {
            console.log(parameter);
        }
        
        function isParameterType(measurementType, isOfType) {
            return measurementType === isOfType;
        }
        
        function setSelectedDataSource() {
            locationDataSource.setSelectedDataSource(vm.dataSourcesModel.selectedDataSource);
        }
        
        $scope.$watch('vm.datePickerModel.datePicker.date', function(newDate) {
            if (newDate) {
                var done = locationDatePicker.setDatePickerDate(vm.datePickerModel.datePicker.date);
                $scope.$broadcast('datePickerChange');
            }
        });
        
    }
        
})();
