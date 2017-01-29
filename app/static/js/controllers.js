'use strict';

angular.module('app.controllers', [])
.controller('RootCtrl', function($scope, $state, Locations, Parameters) {
    
    $scope.Model = {
        loadingIsDone: false,
    };
    
    Locations.locations.query({}, function(data) {
        $scope.locations = data;
        $scope.Model.loadingIsDone = true;
    });
    
}).controller('LocationCtrl', function($scope, $stateParams, Locations, Parameters, Webcams) {
    
    $scope.tabModel = {
        activeTab: 'location-overview',
    };
    
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
        //$scope.location_parameters_list = data;
        $scope.location_parameters_list = [];
        $scope.location_parameters = {};
        $scope.location_parameter_sensors = {};
        
        var foundParameters = {};
        var foundParameterSensors = {};
        // {'air_temp': {sensorList: [], sensors: {'id': 'name'}}}
        for (var i = 0; i < data.length; i++) {
            if (data[i].parameter_id in foundParameters) {
                if (data[i].sensor_id in foundParameterSensors[data[i].parameter_id].sensors) {}
                else {
                    foundParameterSensors[data[i].parameter_id].sensors[data[i].sensor_id] = data[i].sensor_name;
                    var sensor_info = {
                        sensor_id: data[i].sensor_id, 
                        sensor_name: data[i].sensor_name
                    };
                    foundParameterSensors[data[i].parameter_id].sensorList.push(sensor_info);
                    $scope.location_parameter_sensors[data[i].parameter_id].sensors[data[i].sensor_id] = data[i].sensor_name;
                    $scope.location_parameter_sensors[data[i].parameter_id].sensorList.push(sensor_info);
                }

            }
            
            else {
                var parameter_info = {
                    parameter_id: data[i].parameter_id,
                    parameter_name: data[i].parameter_name,
                    parameter_unit: data[i].parameter_unit,
                    parameter_description: data[i].parameter_description,
                    measurement_type: data[i].measurement_type,
                };
                
                var sensor_info = {
                    sensor_id: data[i].sensor_id, 
                    sensor_name: data[i].sensor_name
                };
                
                foundParameters[data[i].parameter_id] = parameter_info;

                $scope.location_parameters_list.push(parameter_info);
                
                
                var sensorId = data[i].sensor_id;
                var sensorName = data[i].sensor_id;
                var sensorKeyVal = {};
                sensorKeyVal[sensorId] = sensorName;
                
                foundParameterSensors[data[i].parameter_id] = {sensorList: [sensor_info], sensors: sensorKeyVal};
                $scope.location_parameter_sensors[data[i].parameter_id] = {sensorList: [sensor_info], sensors: sensorKeyVal};

            }
        }
        //console.log($scope.location_parameters_list);
        //console.log($scope.location_parameters);
        //console.log($scope.location_parameter_sensors);
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
    
    $scope.changeTabContent = function(tabId) {
        $scope.tabModel.activeTab = tabId;
    };
    
    $scope.isSet = function(tabId){
      return $scope.tabModel.activeTab === tabId;
    };
    
}).controller('LocationOverviewCtrl', function($scope) {
    
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
    
    $scope.myInterval = 5000;
    $("#location-images-carousel").carousel();
    
    $scope.slideCarouselLeft = function() {
        $('#location-images-carousel').carousel('prev');
    };
    
    $scope.slideCarouselRight = function() {
        $('#location-images-carousel').carousel('next');
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
    
    $scope.$watch('tabModel.activeTab', function(newValue) {
        if (newValue === 'location-overview') {
            window.setTimeout(function() {
                google.maps.event.trigger($scope.location_info_map, 'resize');
                $scope.location_info_map.fitBounds($scope.bounds);
            },100);
        }
    });

}).controller('LocationDataCtrl', function($scope, Measurements) {
    
    $scope.activeParameterModel = {
        locationLoadingDataIsDone: false
    };
    
    var loadParameterData = function(parameterId) {
        Measurements.daily_parameter_measurements_by_location.query({ location_id: $scope.location.location_id, parameter_id: parameterId }, function(data) {
            $scope.location_parameter_data = data;
            console.log(data);
            
            $scope.activeLocationModel.locationLoadingDataIsDone = true;
        });
    };
    

    $scope.activeParameter = false;
    $scope.activeParameterId;
    $scope.activeParameterMeasurementType;
    
    var initChartOptions = function(parameterName, parameterUnit) {
        var chartOptions = {
            title: {
                text: parameterName
            },
            chart: {
                type: 'spline'
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Time'
                }
            },
            yAxis: {
                title: {
                    text: parameterName + '('+ parameterUnit +')'
                },
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },
            series: [],
        };
        
        return chartOptions;
    };
    
    $scope.chartConfig;
    
    $scope.showParameterData = function(parameterId, parameterName, parameterUnit, measurementType) {
        $scope.activeParameter = true;
        $scope.activeParameterId = parameterId;
        $scope.activeParameterMeasurementType = measurementType;
        console.log(parameterId, parameterName, parameterUnit, measurementType);
        loadParameterData(parameterId);
        $scope.chartConfig = initChartOptions(parameterName, parameterUnit);
        $scope.$watch('activeLocationModel.locationLoadingDataIsDone', function(dataLoaded) {
            if (dataLoaded) {
                data =  [];
                for (var i = 0; i < $scope.location_parameter_data.length; i++) {

                }
            }
        });
        
    };

}).controller('MapController', function($scope) {
    $scope.locationIsChosen = {active: false};
    $scope.activeLocation = {
        name: "",
        lat: null, 
        lng: null,
        positionUrlRep: ""
    };
    
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
    
});
