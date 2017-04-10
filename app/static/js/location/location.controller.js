(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationCtrl', LocationCtrl);
    
    LocationCtrl.$inject = ['$state', 'locationStorage'];
    
    function LocationCtrl($state, locationStorage) {
        var vm = this;
        vm.initTab = "overview";
        vm.location = locationStorage.getLocation();
        vm.selectedItem = vm.initTab;
        
        $state.go("location." + vm.initTab);

    }
    
})();
