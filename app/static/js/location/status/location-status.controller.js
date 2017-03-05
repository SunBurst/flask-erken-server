(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationStatus', LocationStatus);
        
    LocationStatus.$inject = [
        '$scope',
        'resolvedStatusParameters',
        'resolvedStatusParameterSelection',
        'locationStatusStorage',
        'locationStorage'
    ];
        
    function LocationStatus($scope, resolvedStatusParameters, resolvedStatusParameterSelection, locationStatusStorage, locationStorage) {
        var vm = this;

        vm.changeSelection = changeSelection;
        vm.statusParameterList = resolvedStatusParameters;
        vm.statusParameters = locationStorage.getStatusParameters();
        vm.statusParameterSelection = resolvedStatusParameterSelection;
        
        function changeSelection(parameterId, newValue) {
            locationStatusStorage.setStatusParameterSelectedValue(parameterId, newValue);
            //$scope.$broadcast('parameterSelectionChange');
        }
        
    }
        
})();
