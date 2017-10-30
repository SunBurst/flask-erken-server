(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationOverviewCtrl', StationOverviewCtrl);
    
    StationOverviewCtrl.$inject = [
        '$mdDialog', 'GoogleMapDefaultOptions', '_sensors', '_groups', '_parameters', 'GoogleMapIcons', 'stationStorage'
    ];
    
    function StationOverviewCtrl($mdDialog, GoogleMapDefaultOptions, _sensors, _groups, _parameters, GoogleMapIcons, stationStorage) {
        var vm = this;

        vm.customFullscreen = false;
        vm.groups = _groups;
        vm.isImage = isImage;
        vm.parameters = _parameters;
        vm.station = stationStorage.getStation();
        vm.sensors = _sensors;
        vm.showDownloadInfoDialog = showDownloadInfoDialog;
        vm.showSensorInfoDialog = showSensorInfoDialog;
        
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
        
        function isImage(img) {
            if (!img) {
                return false;
            }
            return true;
        }
        
        function showDownloadInfoDialog(ev) {
            $mdDialog.show({
                controller: 'StationDownloadInfoDialogController',
                controllerAs: 'StationDownloadInfoDialogControllerVm',
                templateUrl: '/static/partials/station/station-overview-download-info.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: vm.customFullscreen 
            })
            .then(function(answer) {
                vm.status = 'You said the information was "' + answer + '".';
            }, function() {
                vm.status = 'You cancelled the dialog.';
            });
        }
        
        function showSensorInfoDialog(ev, sensor) {
            $mdDialog.show({
                controller: 'StationSensorInfoDialogController',
                controllerAs: 'StationSensorInfoDialogControllerVm',
                templateUrl: '/static/partials/station/station-overview-sensor-info.dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    sensor: sensor
                },
                fullscreen: vm.customFullscreen 
            });
        }

    }
    
})();
