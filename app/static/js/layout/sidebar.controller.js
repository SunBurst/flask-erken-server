(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    Sidebar.$inject = ['$state', 'networks', 'stations'];
    
    function Sidebar($state, networks, stations) {
        var vm = this;
        
        vm.stations = [];
        vm.isImage = isImage;
        vm.loadingNetworks = false;
        vm.loadingStations = false;
        
        activate();
        
        function activate() {
            //loadNetworks();
            loadStations();
        }
        
        function isImage(img) {
            if (!img) {
                return false;
            }
            return true;
        }
        
        function getNetworks() {
            return networks.getNetworks()
                .then(function(response) {
                    vm.networks = response.data;
                    return vm.networks;
                });
        }
        
        function loadNetworks() {
            vm.loadingNetworks = true;
            return getNetworks().then(function() {
                vm.loadingNetworks = false;
            });
        }
        
        function getStations() {
            return stations.getStations()
                .then(function(response) {
                    vm.stations = response.data;
                    return vm.stations;
                });
        }
        
        function loadStations() {
            vm.loadingStations = true;
            return getStations().then(function() {
                vm.loadingStations = false;
            });
        }
        
        //function selectStation(state) {
        //    $state.go(state);
        //}
    
    }
    
})();
