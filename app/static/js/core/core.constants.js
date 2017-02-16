(function() {
    'use strict';
    
    angular
        .module('app.core')
        .constant('GoogleMapClusterOptions', getGoogleMapClusterOptions())
        .constant('GoogleMapDefaultOptions', getDefaultMapOptions())
        .constant('GoogleMapIcons', getGoogleMapIcons());
        

    function getGoogleMapClusterOptions() {
        return {
            imagePath: '/static/images/google-maps/cluster/m'
        };
    }
    
    function getDefaultMapOptions() {
        return {
            scrollwheel: false, 
            mapTypeControl: true, 
            streetViewControl: false, 
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map'],
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
    }
    
    function getGoogleMapIcons() {
        return {
            blueicon: '/static/images/google-maps/icons/blue-dot.png',
            greenicon: '/static/images/google-maps/icons/green-dot.png',
            redicon: '/static/images/google-maps/icons/red-dot.png'
        };
    }

})();
