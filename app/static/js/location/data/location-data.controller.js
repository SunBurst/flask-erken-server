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
        'locationDataTimeOptions'
    ];
        
    function LocationData($scope, $state, $timeout, resolvedParameters, resolvedParameterSelection, locationStorage, locationDataSource, locationDataStorage, locationDataTimeOptions) {
        var vm = this;
        vm.applyCustomTimeRange = applyCustomTimeRange;
        vm.changeDataSource = changeDataSource;
        vm.changeSelection = changeSelection;
        vm.datePickerMasterModel = {
            startDate: null,
            endDate: null
        };
        vm.isDataSource = isDataSource;
        vm.isParameterType = isParameterType;
        vm.isTimeOption = isTimeOption;
        vm.isViewMode = isViewMode;
        vm.parameterList = resolvedParameters;
        vm.parameters = locationStorage.getParameters();
        vm.parameterSelection = resolvedParameterSelection;
        vm.setDatePicker = setDatePicker;
        vm.setSelectedDataSource = setSelectedDataSource;
        vm.timeOptionChange = timeOptionChange;
        vm.viewMode = 'Charts';
        
        vm.timeOptionsModel = {
            selectedTimeOption: locationDataTimeOptions.getSelectedTimeOption(),
            timeOptions: locationDataTimeOptions.getTimeOptions()
        };
        
        vm.dataSourcesModel = {
            dataSources: locationDataSource.getDataSources(),
            selectedDataSource: locationDataSource.getSelectedDataSource()
        };
        
        vm.setDatePicker();

        function applyCustomTimeRange() {
            locationDataTimeOptions.setCustomRangeTimeOptions(vm.datePickerMasterModel.startDate, vm.datePickerMasterModel.endDate);
            $scope.$broadcast('datePickerChange');
        }
        
        function changeDataSource() {
            vm.setSelectedDataSource();
            $scope.$broadcast('dataSourceChange');
        }
        
        function changeSelection(parameterId, newValue) {
            locationDataStorage.setParameterSelectedValue(parameterId, newValue);
            $scope.$broadcast('parameterSelectionChange');
        }
        
        function isDataSource(dataSource) {
            return dataSource === vm.dataSourcesModel.selectedDataSource;
        }
        
        function isParameterType(parameterType, isOfType) {
            return parameterType === isOfType;
        }
        
        function isTimeOption(timeOption) {
            return timeOption === vm.timeOptionsModel.selectedTimeOption;
        }
        
        function isViewMode(viewMode) {
            return viewMode === vm.viewMode;
        }
        
        function setDatePicker() {
            vm.datePickerMasterModel.startDate = locationDataTimeOptions.getTimeOptionDate(vm.timeOptionsModel.selectedTimeOption)[0];
            vm.datePickerMasterModel.endDate = locationDataTimeOptions.getTimeOptionDate(vm.timeOptionsModel.selectedTimeOption)[1];
        }

        function setSelectedDataSource() {
            locationDataSource.setSelectedDataSource(vm.dataSourcesModel.selectedDataSource);
        }
        
        function timeOptionChange() {
            locationDataTimeOptions.setSelectedTimeOption(vm.timeOptionsModel.selectedTimeOption);
            if (vm.timeOptionsModel.selectedTimeOption !== 'Custom Range') {
                vm.setDatePicker();
                $scope.$broadcast('datePickerChange');
            }
        }
        
        $timeout(function() {
            if ($state.current.name === 'location.data') {
                $state.go('location.data.charts');
            }
        }, 100);
        
        //$scope.$watch(function() {
        //    return vm.datePickerMasterModel.datePicker.date;
        //}, function (newDate, oldDate) {
        //    var done = locationDatePicker.setDatePickerDate(vm.datePickerMasterModel.datePicker.date);
        //    $scope.$broadcast('datePickerChange');
        //});
        
    }
        
})();
