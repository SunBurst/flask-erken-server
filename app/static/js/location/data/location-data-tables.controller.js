(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataTables', LocationDataTables);
        
    LocationDataTables.$inject = ['activeLocationDataFactory'];
        
    function LocationDataTables(activeLocationDataFactory) {
        var vm = this;
        vm.parameters = activeLocationDataFactory.activeLocationParametersSelection;
    }
        
})();

