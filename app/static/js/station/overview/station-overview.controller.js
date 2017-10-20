(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationOverviewCtrl', StationOverviewCtrl);
    
    StationOverviewCtrl.$inject = [
        '$mdDialog', 'GoogleMapDefaultOptions', 'GoogleMapIcons', 'stationStorage'
    ];
    
    function StationOverviewCtrl($mdDialog, GoogleMapDefaultOptions, GoogleMapIcons, stationStorage) {
        var vm = this;

        vm.customFullscreen = false;
        vm.isImage = isImage;
        vm.station = stationStorage.getStation();
        vm.sensorList = stationStorage.getSensorList();
        vm.sensors = stationStorage.getSensors();
        vm.showDownloadInfoDialog = showDownloadInfoDialog;
        
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

    }
    
})();
