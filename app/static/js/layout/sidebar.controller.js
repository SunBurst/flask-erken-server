(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    Sidebar.$inject = ['$state', 'stations'];
    
    function Sidebar($state, stations) {
        var vm = this;
        vm.stations = [];
        vm.selectedDomain = 'stations';
        vm.selectStation = selectStation;
        
        activate();
        
        function activate() {
            return getStations().then(function() {
                console.log("Sidebar loaded");
            });
        }

        function getStations() {
            return stations.getStations()
                .then(function(response) {
                    vm.stations = response.data;
                    return vm.stations;
                });
        }
        
        function selectStation(state) {
            $state.go(state);
        }
    
    }
    
})();
