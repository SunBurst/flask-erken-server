'use strict';

angular.module('app.controllers', []).controller('LocationsListController', function($scope, $state, Location, Parameter) {
    $scope.locations = Location.query();
    $scope.parameters = Parameter.query();
}).controller('LocationViewController', function($scope, $stateParams, Location) {
    $scope.location = Location.get({ id: $stateParams.id });
}).controller('MapController', function($scope) {
    
    $scope.locationChosen = false;
    $scope.activeLocation = "";
    $scope.activeLocationPosition = {latitude: null, longitude: null};
    
    $scope.markerEvents = {
        click: function(marker, event) {
            $('#map').css('width', "33.33333333%");
            $('#map').css('float', "right");
            $scope.locationChosen = true;
            $('#data-view').css('width', "66.66666667%");
            $scope.activeLocation = marker.getTitle();
            $scope.activeLocationPosition.latitude = marker.getPosition().lat();
            $scope.activeLocationPosition.longitude = marker.getPosition().lng();
        }
    };
    
    $scope.mapOptions = {
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
});
