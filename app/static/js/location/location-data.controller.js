(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationData', LocationData);
        
    LocationData.$inject = ['activeLocation', 'activeLocationDataFactory'];
        
    function LocationData(activeLocation, activeLocationDataFactory) {
        var vm = this;
        vm.parameters = activeLocation.getActiveLocationParameters();
        vm.parameterSelection = activeLocationDataFactory.getActiveLocationParametersSelection();
        vm.selection = [];
        vm.parameterChange = parameterChange;
        
        function parameterChange(parameter, isSelected) {
            if (isSelected) {
                vm.selection.push(parameter);
            }
            else {
                for (var i = 0; i < vm.selection.length; i++) {
                    if(vm.selection[i] === parameter) {
                        vm.selection.splice(vm.selection[i], 1);
                    }
                }
            }

        }
    }
        
})();
