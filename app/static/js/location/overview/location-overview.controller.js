(function() {
    
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationOverview', LocationOverview);
    
    LocationOverview.$inject = ['$timeout', 'GoogleMapClusterOptions', 'GoogleMapDefaultOptions', 'GoogleMapIcons', 'locationStorage', 'uiGmapGoogleMapApi'];
    
    function LocationOverview($timeout, GoogleMapClusterOptions, GoogleMapDefaultOptions, GoogleMapIcons, locationStorage, uiGmapGoogleMapApi) {
        var vm = this;

        vm.addLocationMarker = addLocationMarker;
        vm.addStationMarkers = addStationMarkers;
        vm.clusterOptions = angular.copy(GoogleMapClusterOptions);
        vm.liveWebcams = locationStorage.getLiveWebcamList();
        vm.location = locationStorage.getLocation();
        vm.stationList = locationStorage.getStationList();
        vm.stations = locationStorage.getStations();
        vm.locationCarousel = $('#location-images-carousel');
        vm.locationCarouselInterval = 5000;
        vm.map = { 
            center: { 
                latitude: vm.location.location_position.latitude, 
                longitude: vm.location.location_position.longitude
            },
            showMap: true,
            zoom: 12 
        };
        vm.mapOptions = angular.copy(GoogleMapDefaultOptions);
        vm.mapIcons = angular.copy(GoogleMapIcons);
        vm.markers = [];
        vm.slideCarouselLeft = slideCarouselLeft;
        vm.slideCarouselRight = slideCarouselRight;
        
        vm.markers = addLocationMarker(vm.location, vm.markers);
        
        vm.webcamPhotos = locationStorage.getWebcamPhotoList();
        
        vm.locationCarousel.carousel();
        
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
            
            markers = addStationMarkers(vm.stationList, markers);
            
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
