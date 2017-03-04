(function() {
    
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    Sidebar.$inject = ['locations'];
    
    function Sidebar(locations) {
        var vm = this;
        vm.locations = [];
        
        activate();
        
        function activate() {
            return getLocations().then(function() {});
        }

        function getLocations() {
            return locations.getLocations()
                .then(function(response) {
                    vm.locations = response.data;
                    return vm.locations;
                });
        }
    
    }
    
})();
