(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataCharts', LocationDataCharts);
        
    LocationDataCharts.$inject = ['activeLocationDataChartsFactory'];
        
    function LocationDataCharts(activeLocationDataChartsFactory) {
        var vm = this;

        vm.parametersLookup = activeLocationDataChartsFactory.getActiveLocationParametersChartsLookup();

    }
    
})();
