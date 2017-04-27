(function() {
    'use-strict';
    
    angular
        .module('app.station')
        .factory('stationDataSource', stationDataSource);
     
    function stationDataSource() {
        
        var dataSources = ['Daily', 'Hourly', 'High Frequency'];
        var selectedDataSource = 'Daily';
        
        return {
            getDataSources: getDataSources,
            getSelectedDataSource: getSelectedDataSource,
            setSelectedDataSource: setSelectedDataSource
        };
        
        function getDataSources() {
            return dataSources;
        }
        
        function getSelectedDataSource() {
            return selectedDataSource;
        }
        
        function setSelectedDataSource(newValue) {
            selectedDataSource = newValue;
        }

    }
    
})();
