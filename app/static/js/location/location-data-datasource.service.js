(function() {
    'use-strict';
    
    angular
        .module('app.location')
        .factory('activeLocationDataSourceFactory', activeLocationDataSourceFactory);
     
    function activeLocationDataSourceFactory() {
        
        return {
            dataSources: ['Daily', 'Hourly', 'High Frequency'],
            selectedDataSource: 'Daily'
        };
        
        //return {
        //    getDataSources: function() {
        //        return data.dataSources;
        //    },
        //    getSelectedDataSource: function() {
        //        return data.selectedDataSource;
        //    },
        //    setSelectedDataSource: function(newValue) {
        //        data.selectedDataSource = newValue;
        //    }
        //};
    }
    
})();
