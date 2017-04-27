(function() {
    'use strict';
    
    angular
        .module('app.start')
        .controller('StartMapCtrl', StartMapCtrl);
    
    StartMapCtrl.$inject = ['GoogleMapClusterOptions', 'GoogleMapDefaultOptions', 'GoogleMapIcons', 'startStorage'];
    
    function StartMapCtrl(GoogleMapClusterOptions, GoogleMapDefaultOptions, GoogleMapIcons, startStorage) {
        var vm = this;
        
        vm.addStationMarkers = addStationMarkers;
        vm.clusterOptions = GoogleMapClusterOptions;
        vm.stationList = startStorage.getStationList();
        vm.map = {
            center: { 
                latitude: 63, 
                longitude: 16
            }, 
            zoom: 12 
        };
        vm.mapOptions = GoogleMapDefaultOptions;
        vm.mapIcons = GoogleMapIcons;
        vm.markers = [];
        
        activate();

        function addStationMarkers(stations) {
            var markers = [];
            for (var i = 0; i < stations.length; i++) {
                markers.push({
                    latitude: stations[i].position.latitude,
                    longitude: stations[i].position.longitude,
                    icon: vm.mapIcons.blueicon,
                    key: 'marker-id-' + stations[i].id,
                    options: {
                        title: stations[i].name,
                    }
                });

            }
            
            return markers;
        }
        
        function activate() {
            vm.markers = addStationMarkers(vm.stationList);
        }
        
    }

})();
