(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('Location', Location);
    
    Location.$inject = ['$state', '$timeout', 'locationStorage'];
    
    function Location($state, $timeout, locationStorage) {
        var vm = this;
        
        vm.initTab = "overview";
        vm.location = locationStorage.getLocation();
        vm.selectedItem = vm.initTab;
        $state.go("location." + vm.initTab);
        //$timeout(function() {
        //    if ($state.current.name === 'location') {
        //        $state.go('location.overview');
        //    }
        //}, 100);

    }
    
})();
