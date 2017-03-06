(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationStatusCharts', LocationStatusCharts);
        
    LocationStatusCharts.$inject = ['$scope', 'locationStatusStorage'];
    
    function LocationStatusCharts($scope, locationStatusStorage) {
        var vm = this;
        
        vm.statusParameterSelection = locationStatusStorage.getStatusParameterSelection();

        $scope.$on('parameterSelectionChange', function() {
            vm.statusParameterSelection = locationStatusStorage.getStatusParameterSelection();
        });
        
    }
    
})();
