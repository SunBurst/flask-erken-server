(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('locationDataTimeOptions', locationDataTimeOptions);

    function locationDataTimeOptions() {
        
        var timeOptions = {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Last 365 Days': [moment().subtract(364, 'days'), moment()],
            'This Year': [moment().startOf('year'), moment().endOf('year')],
            'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
            'Custom Range': [moment(), moment()]
        };
        
        var selectedTimeOption = 'Last 30 Days';
        
        return {
            getTimeOptionDate: getTimeOptionDate,
            getTimeOptions: getTimeOptions,
            getSelectedTimeOption: getSelectedTimeOption,
            setCustomRangeTimeOptions: setCustomRangeTimeOptions,
            setPredefinedTimeOptions: setPredefinedTimeOptions,
            setSelectedTimeOption: setSelectedTimeOption
        };
        
        function getTimeOptionDate(timeOption) {
            setPredefinedTimeOptions();
            return timeOptions[timeOption];
        }
        
        function getTimeOptions() {
            setPredefinedTimeOptions();
            return timeOptions;
        }
        
        function getSelectedTimeOption() {
            return selectedTimeOption;
        }
        
        function setCustomRangeTimeOptions(startDate, endDate) {
            timeOptions['Custom Range'] = [moment(startDate), moment(endDate)];
        }
        
        function setPredefinedTimeOptions() {
            timeOptions['Today'] = [moment(), moment()];
            timeOptions['Yesterday'] = [moment().subtract(1, 'days'), moment().subtract(1, 'days')];
            timeOptions['Last 7 Days'] = [moment().subtract(6, 'days'), moment()];
            timeOptions['Last 30 Days'] = [moment().subtract(29, 'days'), moment()];
            timeOptions['This Month'] = [moment().startOf('month'), moment().endOf('month')];
            timeOptions['Last Month'] = [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')];
            timeOptions['Last 365 Days'] = [moment().subtract(364, 'days'), moment()];
            timeOptions['This Year'] = [moment().startOf('year'), moment().endOf('year')];
            timeOptions['Last Year'] = [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')];
            
            return timeOptions;
        }
        
        function setSelectedTimeOption(newValue) {
            selectedTimeOption = newValue;
        }

    }

})();
