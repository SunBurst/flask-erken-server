(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationCamsAndPhotosPhotosCtrl', StationCamsAndPhotosPhotosCtrl);
    
    StationCamsAndPhotosPhotosCtrl.$inject = ['$scope', '$mdDialog', '$mdMedia', 'stationStorage', 'StationWebcamsFactory'];
    
    function StationCamsAndPhotosPhotosCtrl($scope, $mdDialog, $mdMedia, stationStorage, StationWebcamsFactory) {
        var vm = this;
        
        vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        vm.$onInit = onInit;
        vm.dateChange = dateChange;
        vm.getWebcamPhotosOnDate = getWebcamPhotosOnDate;
        vm.station = stationStorage.getStation();
        vm.noWebcamPhotos = noWebcamPhotos;
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
            var stationId = vm.station.id;
            var onDate = Number(vm.datePickerModel.date);
            return StationWebcamsFactory.getHourlyWebcamPhotos(stationId, onDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function noWebcamPhotos() {
            if (vm.webcamPhotos.length == 0) {
                return true;
            }
            return false;
        }
        
        function onInit() {
            updateWebcamPhotos();
        }
        
        function showPhoto(ev, index) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
            $mdDialog.show({
                templateUrl: '/static/partials/station/station-cams-and-photos-dialog.html',
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
