'use strict';

angular.module('app.controllers', []).controller('LocationsListController', function($scope, $state, Locations, Parameters) {
    $scope.Model = {
        loadingIsDone: false,
    };
    //$scope.loadingIsDone = false;    
    Locations.locations.query({}, function(data) {
        $scope.locations = data;
        $scope.Model.loadingIsDone = true;
    });
    
    //Parameter.get(function(data) {
    //    $scope.parameters = data;
    //});
}).controller('LocationViewController', function($scope, $stateParams, Locations, Parameters, Webcams) {
    $scope.activeLocationModel = {
        locationLoadingIsDone: false,
        stationsLoadingIsDone: false,
        parametersLoadingIsDone: false,
        liveWebcamsLoadingIsDone: false,
        lastWebcamPhotoLoadingIsDone: false,
    };
    
    Locations.location.query({ location_id: $stateParams.location_id }, function(data) {
        $scope.location = data;
        $scope.activeLocationModel.locationLoadingIsDone = true;
    });
    
    Locations.stations_by_location.query({ location_id: $stateParams.location_id }, function(data) {
        $scope.location_stations = data;
        $scope.activeLocationModel.stationsLoadingIsDone = true;
    });
    
    Parameters.parameters_by_location.query({ location_id: $stateParams.location_id }, function(data) {
        $scope.location_parameters = data;
        $scope.activeLocationModel.parametersLoadingIsDone = true;
    });
    
    Webcams.livewebcams_by_location.query({ location_id: $stateParams.location_id }, function(data) {
        $scope.location_live_webcams = data;
        $scope.activeLocationModel.liveWebcamsLoadingIsDone = true;
    });
    
    Webcams.webcam_photos_by_location.query({ location_id: $stateParams.location_id, limit: 1}, function(data) {
        $scope.location_last_webcam_photo = data[0];
        $scope.activeLocationModel.lastWebcamPhotoLoadingIsDone = true;
    });
    
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(63, 16),
        scrollwheel: false,
        mapTypeControl: true,
        streetViewControl: false,
        mapTypeControlOptions: {mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'],
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        },
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
    };
    
    $scope.location_info_map = new google.maps.Map(document.getElementById('location-info-map'), mapOptions);
    $scope.bounds = new google.maps.LatLngBounds();
    $scope.markers = [];
    
    var createMarker = function (station) {
        
        var marker = new google.maps.Marker({
            map: $scope.location_info_map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            position: new google.maps.LatLng(station.station_position.latitude, station.station_position.longitude),
            title: station.station_name,
            stationIdMarker: station.station_id
        });
        
        google.maps.event.addListener(marker, 'click', function() {
            //$scope.setActiveLocation(marker);
            //google.maps.event.trigger($scope.map, 'resize')
            //$scope.map.panTo(new google.maps.LatLng($scope.activeLocation.lat, $scope.activeLocation.lng));
            //$scope.map.setZoom(12);
            //$scope.$apply();
            window.location.href = '#!/location/' + $scope.location.id + '/' + marker.stationIdMarker + '/';
            
        });
        
        $scope.markers.push(marker);
        $scope.bounds.extend(new google.maps.LatLng(station.station_position.latitude, station.station_position.longitude));
        
    };
    
    var createLocationMarker = function (location) {
        
        var marker = new google.maps.Marker({
            map: $scope.location_info_map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            position: new google.maps.LatLng($scope.location.location_position.latitude, $scope.location.location_position.longitude),
            title: location.location_name,
            locationIdMarker: location.location_id
        });
        
        $scope.markers.push(marker);
        $scope.bounds.extend(new google.maps.LatLng($scope.location.location_position.latitude, $scope.location.location_position.longitude));
        
    };
    
    $scope.$watchGroup(['activeLocationModel.locationLoadingIsDone', 'activeLocationModel.stationsLoadingIsDone'], function(dataLoaded) {
        if (dataLoaded[0]) {
            $scope.location_info_map.setCenter(new google.maps.LatLng($scope.location.location_position.latitude, $scope.location.location_position.longitude));
            createLocationMarker($scope.location);
        }
        if (dataLoaded[1]) {
            for (var i = 0; i < $scope.location_stations.length; i++) {
                createMarker($scope.location_stations[i]);
            }
            if ($scope.bounds.isEmpty()) {}
            else {
                $scope.location_info_map.fitBounds($scope.bounds);
            }
        }
    });
    //$scope.$watchGroup(['activeLocationModel.locationLoadingIsDone', 'activeLocationModel.stationsLoadingIsDone'], function(locationLoaded, stationsLoaded) {
    //    if (locationLoaded) {
    //        console.log($scope.location);
            //$scope.map.setCenter(new google.maps.LatLng($scope.location.location_position.latitude, $scope.location.location_position.longitude))
    //    }
    //});
    
}).controller('MapController', function($scope) {
    $scope.locationIsChosen = {active: false};
    $scope.activeLocation = {
        name: "",
        lat: null, 
        lng: null,
        positionUrlRep: ""
    };
    //$scope.activeLocationEnvCategory = "";
    
    var mapOptions = {
        zoom: 6,
        center: new google.maps.LatLng(63, 16),
        scrollwheel: false, 
        mapTypeControl: true, 
        streetViewControl: false, 
        mapTypeControlOptions: {mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'],
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        },
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
    };
    
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.bounds = new google.maps.LatLngBounds();
    $scope.markers = [];
    
    $scope.setActiveLocation = function(marker) {
        $scope.locationIsChosen.active = true;
        $scope.activeLocation.name = marker.getTitle();
        $scope.activeLocation.positionUrlRep = marker.getPosition().toUrlValue();
        $scope.activeLocation.lat = marker.getPosition().lat();
        $scope.activeLocation.lng = marker.getPosition().lng();
        $('.google-map').removeClass("col-lg-12");
        $('.google-map').addClass("col-lg-4");
        $scope.$apply();
    }
    
    var createMarker = function (location) {
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            position: new google.maps.LatLng(location.position.latitude, location.position.longitude),
            title: location.name,
            locationIdMarker: location.id
        });
        
        google.maps.event.addListener(marker, 'click', function() {
            //$scope.setActiveLocation(marker);
            //google.maps.event.trigger($scope.map, 'resize')
            //$scope.map.panTo(new google.maps.LatLng($scope.activeLocation.lat, $scope.activeLocation.lng));
            //$scope.map.setZoom(12);
            //$scope.$apply();
            window.location.href = '#!/location/' + marker.locationIdMarker + '/';
            
        });
        
        $scope.markers.push(marker);
        $scope.bounds.extend(new google.maps.LatLng(location.position.latitude, location.position.longitude));
        
    };
    
    var createStationMarker = function(locationId, station) {
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            position: new google.maps.LatLng(station.station_position.latitude, station.station_position.longitude),
            title: station.station_name,
            locationIdMarker: locationId,
            stationIdMarker: station.station_id
        });
        
        google.maps.event.addListener(marker, 'click', function() {
            //$scope.setActiveLocation(marker);
            //google.maps.event.trigger($scope.map, 'resize')
            //$scope.map.panTo(new google.maps.LatLng($scope.activeLocation.lat, $scope.activeLocation.lng));
            //$scope.map.setZoom(12);
            //$scope.$apply();
            window.location.href = '#!/location/' + marker.locationIdMarker + '/' + marker.stationIdMarker + '/';
            
        });
        
        $scope.markers.push(marker);
        $scope.bounds.extend(new google.maps.LatLng(station.station_position.latitude, station.station_position.longitude));
        
    };

    $scope.$watch('Model.loadingIsDone', function(dataLoaded) {
        if (dataLoaded) {
            for (var i = 0; i < $scope.locations.length; i++) {
                createMarker($scope.locations[i]);
                for (var j = 0; j < $scope.locations[i].location_stations.length; j++) {
                    createStationMarker($scope.locations[i].id, $scope.locations[i].location_stations[j]);
                }
            }
            var options = {imagePath: '/static/js/googlemaps-markerer-cluster/images/m'};
            $scope.markerCluster = new MarkerClusterer($scope.map, $scope.markers, options);
            
            if ($scope.bounds.isEmpty()) {}
            else {
                $scope.map.fitBounds($scope.bounds);
            }
        }
    });
    
    

    //$scope.map = {control: $scope.mapControl, center: {latitude: 63, longitude: 16}, zoom: 6, options: $scope.mapOptions};
    
});
