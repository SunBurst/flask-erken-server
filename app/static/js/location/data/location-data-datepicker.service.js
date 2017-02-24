(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('locationDatePicker', locationDatePicker);
        
    locationDatePicker.$inject = ['DatePickerOptions'];
     
    function locationDatePicker(DatePickerOptions) {
        
        var datePicker = {
            date: {
                startDate: moment().subtract(30, 'days'),
                endDate: moment()
            }
        };
        
        var datePickerOptions = DatePickerOptions;
        
        return {
            getDatePicker: getDatePicker,
            getDatePickerOptions: getDatePickerOptions,
            setDatePickerDate: setDatePickerDate
        };
        
        function getDatePicker() {
            return datePicker;
        }
        
        function getDatePickerOptions() {
            return datePickerOptions;
        }
        
        function setDatePickerDate(newDate) {
            datePicker.date.startDate = newDate.startDate;
            datePicker.date.endDate = newDate.endDate;
            
            return datePicker;
        }

    }
    
})();
