(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationOverview', LocationOverview);
    
    LocationOverview.$inject = ['$timeout', 'uiGmapGoogleMapApi', 'activeLocation', 'GoogleMapClusterOptions', 'GoogleMapDefaultOptions', 'GoogleMapIcons'];
    
    function LocationOverview($timeout, uiGmapGoogleMapApi, activeLocation, GoogleMapClusterOptions, GoogleMapDefaultOptions, GoogleMapIcons) {
        var vm = this;
        vm.addLocationMarker = addLocationMarker;
        vm.addStationMarkers = addStationMarkers;
        vm.clusterOptions = GoogleMapClusterOptions;
        vm.location = activeLocation.getActiveLocation();
        vm.stations = activeLocation.getActiveLocationStations();
        vm.stationsLookup = activeLocation.getActiveLocationStationsLookup();
        vm.liveWebcams = activeLocation.getActiveLocationLiveWebcams();
        vm.lastWebcamPhoto = activeLocation.getActiveLocationLastWebcamPhoto();
        vm.webcamPhotos = activeLocation.getActiveLocationWebcamPhotos();
        vm.locationCarouselInterval = 5000;
        vm.locationCarousel = $('#location-images-carousel');
        vm.locationCarousel.carousel();
        vm.map = { 
            center: { 
                latitude: vm.location.location_position.latitude, 
                longitude: vm.location.location_position.longitude
            },
            showMap: true,
            zoom: 12 
        };
        vm.mapOptions = GoogleMapDefaultOptions;
        vm.mapIcons = GoogleMapIcons;
        vm.markers = [];
        vm.slideCarouselLeft = slideCarouselLeft;
        vm.slideCarouselRight = slideCarouselRight;
        
        vm.markers = addLocationMarker(vm.location, vm.markers);
        vm.markers = addStationMarkers(vm.stations, vm.markers);
        
        function addLocationMarker(location, markers) {
            var markers = markers;
            markers.push({
                latitude: location.location_position.latitude,
                longitude: location.location_position.longitude,
                icon: vm.mapIcons.redicon,
                key: 'marker-id-' + location.location_id,
                options: {
                    title: location.location_name,
                }
            });
            
            return markers;
        }
        
        function addStationMarkers(stations, markers) {
            var markers = markers;
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
        
        function slideCarouselLeft() {
            vm.locationCarousel.carousel('prev');
        };
    
        function slideCarouselRight() {
            vm.locationCarousel.carousel('next');
        };
    }
    
})();
