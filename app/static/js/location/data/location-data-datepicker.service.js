(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('locationDataTimeOptions', locationDataTimeOptions);

    function locationDataTimeOptions() {
        
        var timeOptions = {
            'Last 30 Days': {
                startDate: moment().subtract(30, 'days'),
                endDate: moment()
            }
        };
        var selectedTimeOption = 'Last 30 Days';
        
        return {
            getTimeOptions: getTimeOptions,
            getSelectedTimeOption: getSelectedTimeOption,
            setSelectedTimeOption: setSelectedTimeOption
        };
        
        function getTimeOptions() {
            return timeOptions;
        }
        
        function getSelectedTimeOption() {
            return selectedTimeOption;
        }
        
        function setSelectedTimeOption(newValue) {
            selectedTimeOption = newValue;
        }
    
    }

})();
