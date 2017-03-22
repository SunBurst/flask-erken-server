(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    Sidebar.$inject = ['$state', 'locations'];
    
    function Sidebar($state, locations) {
        var vm = this;
        vm.locations = [];
        vm.selectLocation = selectLocation;
        
        activate();
        
        function activate() {
            return getLocationsAndStations().then(function() {
                console.log("Sidebar loaded");
            });
        }

        function getLocationsAndStations() {
            return locations.getLocationsAndStations()
                .then(function(response) {
                    vm.locations = response.data;
                    return vm.locations;
                });
        }
        
        function selectLocation(state) {
            $state.go(state);
        }
    
    }
    
})();
