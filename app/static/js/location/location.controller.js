(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('Location', Location);
    
    Location.$inject = ['$state', 'locationStorage'];
    
    function Location($state, locationStorage) {
        var vm = this;

        vm.initTab = "overview";
        vm.location = locationStorage.getLocation();
        vm.selectedItem = vm.initTab;
        $state.go("location." + vm.initTab);

    }
    
})();
