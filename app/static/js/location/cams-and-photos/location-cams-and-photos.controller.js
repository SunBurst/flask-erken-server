(function() {
    'use strict';
    
    angular
        .module('app.location')
        .controller('LocationCamsAndPhotos', LocationCamsAndPhotos);
    
    LocationCamsAndPhotos.$inject = ['$scope', 'resolvedLiveWebcams', 'locationCamsAndPhotosStorage', 'locationStorage', 'locationWebcams'];
    
    function LocationCamsAndPhotos($scope, resolvedLiveWebcams, locationCamsAndPhotosStorage, locationStorage, locationWebcams) {
        var vm = this;

        vm.getWebcamPhotos = getWebcamPhotos;
        vm.liveWebcams = resolvedLiveWebcams;
        vm.location = locationStorage.getLocation();
        vm.openLightboxModal = openLightboxModal;
        vm.updateWebcamPhotos = updateWebcamPhotos;
        vm.webcamPhotos = [];
       
        vm.datePickerModel = {
            datePicker: {
                date: moment().startOf('day')
            },
            datePickerOptions: {
                singleDatePicker: true
            }
        };

        function updateWebcamPhotos() {
            vm.getWebcamPhotos().then(function(data) {
                vm.webcamPhotos = locationCamsAndPhotosStorage.setLightboxImagesList(data);
                return vm.webcamPhotos;
            });
        }
        
        function getWebcamPhotos() {
            var locationId = vm.location.location_id;
            var fromDate = vm.datePickerModel.datePicker.date.valueOf();
            var dateCopy = vm.datePickerModel.datePicker.date
            var toDate = dateCopy.clone().add(1, 'days').valueOf();
            return locationWebcams.getWebcamPhotos(locationId, fromDate, toDate)
                .then(function(response) {
                    return response.data;
                });
        }
        
        function openLightboxModal(index) {
            Lightbox.openModal(vm.webcamPhotos, index);
        };
        
        $scope.$watch(function() {
            return vm.datePickerModel.datePicker.date;
        }, function (newDate, oldDate) {
            vm.updateWebcamPhotos();
        });

    }
        
})();
