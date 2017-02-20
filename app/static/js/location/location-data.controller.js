(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationData', LocationData);
        
    LocationData.$inject = [
        'activeLocation', 
        'activeLocationDataFactory', 
        'activeLocationDataDatePickerFactory', 
        'activeLocationDataSourceFactory'
    ];
        
    function LocationData(activeLocation, activeLocationDataFactory, activeLocationDataDatePickerFactory, activeLocationDataSourceFactory) {
        var vm = this;
        
        //vm.changeGlobalDataSource = changeGlobalDataSource;
        //vm.changeGlobalDatePicker = changeGlobalDatePicker;
        //vm.changeGlobalParameterSelection = changeGlobalParameterSelection;
        vm.dataSourcesModel = {
            dataSources: activeLocationDataSourceFactory.dataSources,
            selectedDataSource: activeLocationDataSourceFactory.selectedDataSource
        };
        vm.datePickerModel = {
            datePicker: {
                date: activeLocationDataDatePickerFactory.datePicker
            },
            datePickerOptions: activeLocationDataDatePickerFactory.datePickerOptions
        };
        //vm.datePickerOptions.eventHandlers = {
        //    'apply.daterangepicker': vm.changeGlobalDatePicker
        //};
        //vm.parameters = activeLocationDataFactory.getActiveLocationParametersSelection();
        vm.parameters = activeLocationDataFactory.activeLocationParametersSelection;
        
        //function changeGlobalDataSource() {
        //    activeLocationDataSourceFactory.setSelectedDataSource(vm.selectedDataSource);
        //    vm.selectedDataSource = activeLocationDataSourceFactory.getSelectedDataSource();
        //}
        
        //function changeGlobalDatePicker() {
        //    activeLocationDataDatePickerFactory.setDatePickerDate(vm.datePicker.date.startDate, vm.datePicker.date.endDate);
        //    vm.datePicker = activeLocationDataDatePickerFactory.getDatePicker();
        //}
        
        //function changeGlobalParameterSelection() {
            //activeLocationDataFactory.activeLocationParametersSelection = vm.parameters;
            //vm.parameters = activeLocationDataFactory.getActiveLocationParametersSelection();
        //}
        
    }
        
})();
