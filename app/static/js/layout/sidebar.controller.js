(function() {
    
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    function Sidebar(LocationsFactory) {
        var vm = this;
        vm.locations = [];
        
        activate();
        
        function activate() {
            return getLocations().then(function() {
                console.log("Sidebar ready.");
            });
        }
        
        function getLocations() {
            return LocationsFactory.getLocations()
                .then(function(response) {
                    vm.locations = response.data;
                    return vm.locations;
                });
        }
    }
    
})();
