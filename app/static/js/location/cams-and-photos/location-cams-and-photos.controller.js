(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationCamsAndPhotos', LocationCamsAndPhotos);
    
    LocationCamsAndPhotos.$inject = ['$scope', '$mdDialog', '$mdMedia', 'resolvedLiveWebcams', 'locationCamsAndPhotosStorage', 'locationStorage', 'locationWebcams'];
    
    function LocationCamsAndPhotos($scope, $mdDialog, $mdMedia, resolvedLiveWebcams, locationCamsAndPhotosStorage, locationStorage, locationWebcams) {
        var vm = this;
        
        vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        vm.dateChange = dateChange;
        vm.getWebcamPhotosOnDate = getWebcamPhotosOnDate;
        vm.liveWebcams = resolvedLiveWebcams;
        vm.location = locationStorage.getLocation();
        vm.showPhoto = showPhoto;
        vm.updateWebcamPhotos = updateWebcamPhotos;
        vm.webcamPhotos = [];
       
        vm.datePickerModel = {
            date: moment().startOf('day')
        };

        function dateChange() {
            updateWebcamPhotos();
        }
        
        function getWebcamPhotosOnDate() {
            var locationId = vm.location.location_id;
            var onDate = vm.datePickerModel.date.valueOf();
            return locationWebcams.getWebcamPhotos(locationId, onDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function showPhoto(ev, index) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
            $mdDialog.show({
                templateUrl: '/static/partials/location/location-cams-and-photos-dialog.html',
                locals: {photoData: vm.webcamPhotos[index]},   
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                controller: DialogController,
                controllerAs: 'dialogVm'
            })
            .then(function(answer) {
                vm.status = 'You said the information was "' + answer + '".';
            }, function() {
                vm.status = 'You cancelled the dialog.';
            });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                vm.customFullscreen = (wantsFullScreen === true);
            });
          };
        
        function updateWebcamPhotos() {
            vm.getWebcamPhotosOnDate().then(function(data) {
                vm.webcamPhotos = data;
            });
        }
        
    }
    
    function DialogController($mdDialog, photoData) {
        var vm = this;
        vm.webcamPhoto = photoData;
        vm.hide = function() {
            $mdDialog.hide();
        };
        vm.cancel = function() {
            $mdDialog.cancel();
        };
        vm.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }
    
})();
