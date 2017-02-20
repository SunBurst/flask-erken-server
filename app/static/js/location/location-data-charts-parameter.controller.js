(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataChartsParameter', LocationDataChartsParameter);
    
    LocationDataChartsParameter.$inject = ['activeLocationDataDatePickerFactory', 'HighChartOptions'];
    
    function LocationDataChartsParameter(activeLocationDataDatePickerFactory, HighChartOptions) {
        var vm = this;
        vm.initChartOptions = initChartOptions;
        vm.locationChartOptions;
        vm.datePickerModel = {
            datePicker: {
                date: {
                    startDate: activeLocationDataDatePickerFactory.datePicker.date.startDate,
                    endDate: activeLocationDataDatePickerFactory.datePicker.date.endDate
                }
            },
            datePickerOptions: activeLocationDataDatePickerFactory.datePickerOptions
        };
        
        function initChartOptions(parameterName, parameterUnit, locationName) {
            vm.locationChartOptions = HighChartOptions;
            console.log(vm.locationChartOptions);
            vm.locationChartOptions.title.text = 'Daily Average ' + parameterName + ' at ' + locationName;
            vm.locationChartOptions.subtitle.text = vm.datePickerModel.datePicker.date.startDate.format('YYYY-MM-DD HH:mm:ss')  + ' - ' + vm.datePickerModel.datePicker.date.endDate.format('YYYY-MM-DD HH:mm:ss');
            vm.locationChartOptions.yAxis.title.text = parameterName + ' (' + parameterUnit + ')';
        }
        
    }
    
})();
