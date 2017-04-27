(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDataCtrl', StationDataCtrl);
        
    StationDataCtrl.$inject = [
        '$scope',
        '$state',
        '$timeout',
        'stationStorage',
        'stationDataSource',
        'stationDataStorage',
        'stationDataTimeOptions'
    ];
        
    function StationDataCtrl($scope, $state, $timeout, stationStorage, stationDataSource, stationDataStorage, stationDataTimeOptions) {
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
        vm.maxDate = moment();
        vm.minDate = moment(0);
        vm.parameterList = stationStorage.getParametersAllMeasurementTypesList();
        vm.parameters = stationStorage.getParametersAllMeasurementTypes();
        vm.parameterSelection = stationDataStorage.getParametersAllMeasurementTypesSelection();
        vm.setDatePicker = setDatePicker;
        vm.setSelectedDataSource = setSelectedDataSource;
        vm.timeOptionChange = timeOptionChange;
        vm.viewMode = 'Charts';
        
        vm.timeOptionsModel = {
            selectedTimeOption: stationDataTimeOptions.getSelectedTimeOption(),
            timeOptions: stationDataTimeOptions.getTimeOptions()
        };
        
        vm.dataSourcesModel = {
            dataSources: stationDataSource.getDataSources(),
            selectedDataSource: stationDataSource.getSelectedDataSource()
        };
        
        vm.setDatePicker();

        function applyCustomTimeRange() {
            stationDataTimeOptions.setCustomRangeTimeOptions(vm.datePickerMasterModel.startDate, vm.datePickerMasterModel.endDate);
            $scope.$broadcast('datePickerChange');
        }
        
        function changeDataSource() {
            vm.setSelectedDataSource();
            $scope.$broadcast('dataSourceChange');
        }
        
        function changeSelection() {
            stationDataStorage.updateParametersAllMeasurementTypesSelection(vm.parameterSelection);
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
            vm.maxDate = moment();
            vm.datePickerMasterModel.startDate = stationDataTimeOptions.getTimeOptionDate(vm.timeOptionsModel.selectedTimeOption)[0];
            vm.datePickerMasterModel.endDate = stationDataTimeOptions.getTimeOptionDate(vm.timeOptionsModel.selectedTimeOption)[1];
        }

        function setSelectedDataSource() {
            stationDataSource.setSelectedDataSource(vm.dataSourcesModel.selectedDataSource);
        }
        
        function timeOptionChange() {
            stationDataTimeOptions.setSelectedTimeOption(vm.timeOptionsModel.selectedTimeOption);
            if (vm.timeOptionsModel.selectedTimeOption !== 'Custom Range') {
                vm.setDatePicker();
                $scope.$broadcast('datePickerChange');
            }
        }
        
        $timeout(function() {
            if ($state.current.name === 'station.data') {
                $state.go('station.data.charts');
            }
        }, 100);
        
    }
        
})();
