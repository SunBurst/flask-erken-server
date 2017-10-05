(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    Sidebar.$inject = ['$state', 'stations'];
    
    function Sidebar($state, stations) {
        var vm = this;
        
        vm.stations = [];
        vm.isImage = isImage;
        vm.loadingStations = false;
        
        activate();
        
        function activate() {
            loadStations();
        }
        
        function isImage(img) {
            if (!img) {
                return false;
            }
            return true;
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
    
    }
    
})();
