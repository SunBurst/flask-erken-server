(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationDataTables', LocationDataTables);
        
    LocationDataTables.$inject = ['$scope', 'locationDataStorage'];
    
    function LocationDataTables($scope, locationDataStorage) {
        var vm = this;
        vm.parameterSelection = locationDataStorage.getParameterSelection();
        
        $scope.$on('parameterSelectionChange', function() {
            vm.parameterSelection = locationDataStorage.getParameterSelection();
        });
        
    }
    
})();
