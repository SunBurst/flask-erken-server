(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationStatusTables', LocationStatusTables);
        
    LocationStatusTables.$inject = ['$scope', 'locationStatusStorage'];
    
    function LocationStatusTables($scope, locationStatusStorage) {
        var vm = this;
        
        vm.statusParameterSelection = locationStatusStorage.getStatusParameterSelection();
        
        $scope.$on('parameterSelectionChange', function() {
            vm.statusParameterSelection = locationStatusStorage.getStatusParameterSelection();
        });
        
    }
    
})();
