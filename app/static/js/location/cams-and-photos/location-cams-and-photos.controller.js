(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationCamsAndPhotosCtrl', LocationCamsAndPhotosCtrl);
    
    LocationCamsAndPhotosCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia', 'locationStorage', 'locationVideos', 'LocationWebcamsFactory'];
    
    function LocationCamsAndPhotosCtrl($scope, $mdDialog, $mdMedia, locationStorage, locationVideos, LocationWebcamsFactory) {
        var vm = this;
        
        vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        vm.dateChange = dateChange;
        vm.getVideoUrls = getVideoUrls;
        vm.getWebcamPhotosOnDate = getWebcamPhotosOnDate;
        vm.liveWebcams = locationStorage.getLiveWebcamList();
        vm.location = locationStorage.getLocation();
        vm.noLiveWebcams = noLiveWebcams;
        vm.noVideos = noVideos;
        vm.noWebcamPhotos = noWebcamPhotos;
        vm.showPhoto = showPhoto;
        vm.updateWebcamPhotos = updateWebcamPhotos;
        vm.webcamPhotos = [];
        vm.videoUrls = [];
        
        vm.datePickerModel = {
            date: moment().startOf('day')
        };

        function dateChange() {
            updateVideoUrls();
            updateWebcamPhotos();
        }
        
        function changeCameraMode() {
            
        }
        
        function getVideoUrls() {
            var locationId = vm.location.location_id;
            var onDate = vm.datePickerModel.date.valueOf();
            return locationVideos.getVideoUrls(locationId, onDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function getWebcamPhotosOnDate() {
            var locationId = vm.location.location_id;
            var onDate = vm.datePickerModel.date.valueOf();
            return LocationWebcamsFactory.getWebcamPhotos(locationId, onDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function noLiveWebcams() {
            if (vm.liveWebcams.length == 0) {
                return true;
            }
            return false;
        }
        
        function noVideos() {
            if (vm.videoUrls.length == 0) {
                return true;
            }
            return false;
            
        }
        
        function noWebcamPhotos() {
            if (vm.webcamPhotos.length == 0) {
                return true;
            }
            return false;
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
        
        function updateVideoUrls() {
            vm.getVideoUrls().then(function(data) {
                vm.videoUrls = data;
            });
        }
        
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
