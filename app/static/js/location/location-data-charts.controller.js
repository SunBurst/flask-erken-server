(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataCharts', LocationDataCharts);
        
    LocationDataCharts.$inject = ['$scope' ,'activeLocationDataFactory'];
        
    function LocationDataCharts($scope, activeLocationDataFactory) {
        var vm = this;
        vm.parameters = activeLocationDataFactory.activeLocationParametersSelection;
        //console.log(vm.parameters);
        
    }
    
})();
