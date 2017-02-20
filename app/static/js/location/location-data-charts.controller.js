(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataCharts', LocationDataCharts);
        
    LocationDataCharts.$inject = ['activeLocationDataFactory', 'activeLocationDataSourceFactory'];
        
    function LocationDataCharts(activeLocationDataFactory, activeLocationDataSourceFactory) {
        var vm = this;
        vm.dataSourcesModel = {
            selectedDataSource: activeLocationDataSourceFactory.selectedDataSource
        };
        
        vm.parameters = activeLocationDataFactory.activeLocationParametersSelection;

    }
    
})();
