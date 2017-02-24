(function() {
    'use strict';
    
    angular
        .module('app.start')
        .controller('StartMap', StartMap);
    
    StartMap.$inject = ['GoogleMapClusterOptions', 'GoogleMapDefaultOptions', 'GoogleMapIcons', 'startStorage'];
    
    function StartMap(GoogleMapClusterOptions, GoogleMapDefaultOptions, GoogleMapIcons, startStorage) {
        var vm = this;
        
        vm.addLocationMarkers = addLocationMarkers;
        vm.addStationMarkers = addStationMarkers;
        vm.clusterOptions = GoogleMapClusterOptions;
        vm.locationList = startStorage.getLocationList();
        vm.map = { center: { latitude: 63, longitude: 16}, zoom: 12 };
        vm.mapOptions = GoogleMapDefaultOptions;
        vm.mapIcons = GoogleMapIcons;
        vm.markers = [];
        
        activate();

        function addLocationMarkers(locations) {
            var markers = [];
            for (var i = 0; i < locations.length; i++) {
                markers.push({
                    latitude: locations[i].position.latitude,
                    longitude: locations[i].position.longitude,
                    icon: vm.mapIcons.redicon,
                    key: 'marker-id-' + locations[i].id,
                    options: {
                        title: locations[i].name,
                    }
                });
                
                markers = addStationMarkers(locations[i].location_stations, markers);

            }
            
            return markers;
        }
        
        function addStationMarkers(stations, markers) {
            for (var i = 0; i < stations.length; i++) {
                markers.push({
                    latitude: stations[i].station_position.latitude,
                    longitude: stations[i].station_position.longitude,
                    icon: vm.mapIcons.blueicon,
                    key: 'marker-id-' + stations[i].station_id,
                    options: {
                        title: stations[i].station_name,
                    }
                });
            }
            
            return markers;
        }
        
        function activate() {
            vm.markers = addLocationMarkers(vm.locationList);
        }
        
    }

})();
