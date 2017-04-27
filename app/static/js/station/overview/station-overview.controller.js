(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationOverviewCtrl', StationOverviewCtrl);
    
    StationOverviewCtrl.$inject = [
        'GoogleMapDefaultOptions', 'GoogleMapIcons', 'stationStorage'
    ];
    
    function StationOverviewCtrl(GoogleMapDefaultOptions, GoogleMapIcons, stationStorage) {
        var vm = this;

        vm.station = stationStorage.getStation();
        vm.sensorList = stationStorage.getSensorList();
        vm.sensors = stationStorage.getSensors();
        vm.map = { 
            center: { 
                latitude: vm.station.position.latitude, 
                longitude: vm.station.position.longitude
            },
            showMap: true,
            zoom: 12 
        };
        
        vm.mapOptions = angular.copy(GoogleMapDefaultOptions);
        vm.mapIcons = angular.copy(GoogleMapIcons);
        
        vm.mapMarker = {
            coords: {
                latitude: vm.station.position.latitude,
                longitude: vm.station.position.longitude
            },
            key: 'marker-id-' + vm.station.id,
            options: {
                icon: vm.mapIcons.blueicon,
                title: vm.station.name
            }
        };

    }
    
})();
