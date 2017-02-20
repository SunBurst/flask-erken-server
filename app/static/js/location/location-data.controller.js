(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationData', LocationData);
        
    LocationData.$inject = [
        'activeLocation', 
        'activeLocationDataFactory', 
        'activeLocationDataDatePickerFactory', 
        'activeLocationDataSourceFactory', 
        'DatePickerOptions'
    ];
        
    function LocationData(activeLocation, activeLocationDataFactory, activeLocationDataDatePickerFactory, activeLocationDataSourceFactory, DatePickerOptions) {
        var vm = this;
        
        vm.changeGlobalDataSource = changeGlobalDataSource;
        vm.changeGlobalDatePicker = changeGlobalDatePicker;
        vm.changeGlobalParameterSelection = changeGlobalParameterSelection;
        vm.dataSources = activeLocationDataSourceFactory.getDataSources();
        vm.datePicker = activeLocationDataDatePickerFactory.getDatePicker();
        vm.datePickerOptions = DatePickerOptions;
        vm.datePickerOptions.eventHandlers = {
            'apply.daterangepicker': vm.changeGlobalDatePicker
        };
        //vm.parameters = activeLocationDataFactory.getActiveLocationParametersSelection();
        vm.parameters = activeLocationDataFactory.activeLocationParametersSelection;
        console.log(activeLocationDataFactory);
        vm.selectedDataSource = activeLocationDataSourceFactory.getSelectedDataSource();
        
        function changeGlobalDataSource() {
            activeLocationDataSourceFactory.setSelectedDataSource(vm.selectedDataSource);
            vm.selectedDataSource = activeLocationDataSourceFactory.getSelectedDataSource();
        }
        
        function changeGlobalDatePicker() {
            activeLocationDataDatePickerFactory.setDatePickerDate(vm.datePicker.date.startDate, vm.datePicker.date.endDate);
            vm.datePicker = activeLocationDataDatePickerFactory.getDatePicker();
        }
        
        function changeGlobalParameterSelection() {
            activeLocationDataFactory.setActiveLocationParametersSelection(vm.parameters);
            //vm.parameters = activeLocationDataFactory.getActiveLocationParametersSelection();
        }
        
    }
        
})();
