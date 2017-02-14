(function() {
    'use strict';
    
    angular
        .module('app.start')
        .controller('StartMap', StartMap);
    
    function StartMap(LocationsFactory, GoogleMapDefaultOptions) {
        var vm = this;
        
        vm.addMarkers = addMarkers;
        vm.locationMarkers = [];
        vm.locations = [];
        vm.map = { center: { latitude: 63, longitude: 16}, zoom: 12 };
        vm.mapOptions = GoogleMapDefaultOptions;
        
        activate();
        
        function addMarkers(data) {
            var markers = [];
            for (var i = 0; i < data.length; i++) {
                markers.push({
                    'coords': {
                        'latitude': data[i].position.latitude,
                        'longitude': data[i].position.longitude
                    },
                    'key': 'marker-id-' + data[i].id
                });

            }
            
            return markers;
        }
        
        function activate() {
            return getLocations().then(function() {
                vm.locationMarkers = addMarkers(vm.locations);
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
