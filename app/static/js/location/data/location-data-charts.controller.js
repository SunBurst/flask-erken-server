(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataCharts', LocationDataCharts);
        
    LocationDataCharts.$inject = ['$scope', 'locationDataStorage'];
    
    
    function LocationDataCharts($scope, locationDataStorage) {
        var vm = this;
        
        vm.parameterSelection = locationDataStorage.getParameterSelection();
        
        $scope.$on('parameterSelectionChange', function() {
            vm.parameterSelection = locationDataStorage.getParameterSelection();
        });
        
    }
    
})();
