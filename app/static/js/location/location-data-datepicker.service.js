(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('activeLocationDataDatePickerFactory', activeLocationDataDatePickerFactory);
        
    activeLocationDataDatePickerFactory.$inject = ['DatePickerOptions'];
     
    function activeLocationDataDatePickerFactory(DatePickerOptions) {
        
        var data = {
            datePicker: {
                date: {
                    startDate: moment().subtract(29, 'days'),
                    endDate: moment()
                }
            },
            datePickerOptions: DatePickerOptions
        };
        
        return {
            getDatePicker: function() {
                return data.datePicker;
            },
            getDatePickerOptions: function() {
                return data.datePickerOptions;
            },
            setDatePickerDate: function(startDate, endDate) {
                data.datePicker.date.startDate = startDate;
                data.datePicker.date.endDate = endDate;
            }
        };
    }
    
})();
